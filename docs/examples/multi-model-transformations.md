---
hide:
  - path
---

# Multi-Model Transformations

The code for the transformation below can be found [here](https://github.com/yamtl/examples/tree/master/multimodel) (`src/main/groovy/multimodel` contains the definition of transformations and `src/test/groovy/multimodel` how to execute them with some example models).

The examples below use the metamodel `CD` of class diagrams below (in EMFatic notation):

```emfatic
package CD ;

abstract class NamedElt {
!ordered attr String[1] name;
}

abstract class Classifier extends NamedElt {
}

class DataType extends Classifier {
}

class Class extends Classifier {
!ordered ref Class[*] ~super;
val Attribute[*]#owner ~attr;
!ordered attr Boolean[1] isAbstract = false;
}

class Attribute extends NamedElt {
!ordered attr Boolean[1] multiValued = false;
!ordered ref Classifier[1] type;
!ordered ref Class[1]#~attr owner;
}

class Package extends Classifier {
val Classifier[*] classifiers;
}

datatype Boolean : java.lang.Boolean ;

datatype Integer : java.lang.Integer;

datatype String : java.lang.String;
```

## Constraints Across Input Domains (Pattern Matching Semantics)

Given the class diagram metamodel `CD` above, we can define a multi-model transformation that takes two class diagrams `model1` and `model2` (two instances of the metamodel `CD`) and checks whether `model1` is an embedding of `model2` (using the attribute `name` for identifying classes) as follows:

```groovy
public class Embedding extends YAMTLModule {
	
	def List<String> inconsistencyList = []
	
	public Embedding(EPackage CD) {
		
		YAMTLGroovyExtensions_dynamicEMF.init( this )
		
		header().in('model1', CD).in('model2', CD)
		
		ruleStore([
			rule('Class')
				.in('c1', 'model1', CD.Class)
					.filter { 
						def c2 = allInstances('model2',CD.Class).find{ it.name == c1.name}
						c2 == null
					}
				.query()
				.endWith({
					inconsistencyList << "${c1.name} not in model2"
				})
		])
	}	
}
```

The input pattern in the transformation rule `Class` finds the classes `c1` in the domain `model1` that do not have a counterpart `c2` (with the same name) in `model2`. Hence, spotting inconsistencies. The block `endWith` is executed at the end of the rule application and appends the inconsistency to a list `inconsistencyList`.

This transformation is executed with the following code, where we only use [pattern matching semantics](../yamtl-reference.html#pattern-matching-semantics) to apply the input pattern, without creating any output model:

```groovy
def resSM = Embedding.preloadMetamodel("path/to/CD.ecore")
def pk = resSM.contents.get(0) as EPackage

def embedding = new Embedding(pk)
embedding.selectedExecutionPhases = ExecutionPhase.MATCH_ONLY
YAMTLGroovyExtensions.init( embedding )

embedding.loadInputModels(['model1': 'path/to/model1.xmi', 'model2': 'path/to/model2.xmi'])
embedding.execute()
```


## Model Matching (Out-Place Semantics)

Given the class diagram metamodel `CD` above, we can define a multi-model transformation that checks the commonalities of two separate class diagrams as follows:


```groovy
public class Comparator extends YAMTLModule {
	public Comparator(EPackage CD) {
		YAMTLGroovyExtensions_dynamicEMF.init( this )
		
		header().in('model1', CD).in('model2', CD).out('out', CD)
		
		ruleStore([
			rule('MatchPackage')
				.in('p1', 'model1', CD.Package)
				.in('p2', 'model2', CD.Package).filter { p1.name == p2.name }
				.out('new_p', 'out', CD.Package, {
					new_p.name = p1.name
					
					def new_c_list = fetch(['c1': p1.classifiers, 'c2': p2.classifiers])
					new_p.classifiers.addAll(new_c_list)
				}),

			rule('MatchDataType')
				.in('c1', 'model1', CD.DataType)
				.in('c2', 'model2', CD.DataType).filter { c1.name == c2.name }
				.out('new_d', 'out', CD.DataType, {
					new_d.name = c1.name
				}),

			rule('MatchClass')
				.in('c1', 'model1', CD.Class)
				.in('c2', 'model2', CD.Class).filter { c1.name == c2.name }
				.out('new_c', 'out', CD.Class, {
					new_c.name = c1.name
					def new_a_list = fetch(['a1': c1.attr, 'a2': c2.attr])
					new_c.attr.addAll(new_a_list)
				}),
			
			rule('MatchAttribute')
				.in('a1', 'model1', CD.Attribute)
				.in('a2', 'model2', CD.Attribute).filter { 
					a1.owner.name == a2.owner.name && a1.name == a2.name }
				.out('new_a', 'out', CD.Attribute, {
					new_a.name = a1.name
				})
		])
	}
}
```

Each rule in this transformation identifies common elements by type and name for the rules `MatchPackage`, `MatchDataType`, and `MatchClass`. The rule `MatchAttribute` additionally requires that the classes containing these attributes be matched as well.

This transformation uses [Out-Place Semantics](../yamtl-reference.html#out-place-transformation-semantics) to produce an output model with the common parts of two class diagrams, representing the match. Variants can be easily specified by using the `endWith` block or by including an additional `out` domain in the header to build an additional model.

This example illustrates how the `fetch()` operator is used to find the output matches for a set of input matches. For example, `fetch(['c1': p1.classifiers, 'c2': p2.classifiers])` will return the list of objects that correspond to matches in `p1.classifiers` and `p2.classifiers` via the rules `MatchClass` and `MatchDataType`. YAMTL will automatically apply the rules internally and find the correct objects. Note that for this to work properly, the `in` elements must use the same variables, `c1` and `c2`, in both rules. This process can be simplified using [rule inheritance](../yamtl-reference.html#rule-inheritance) by defining a super-rule that declares the common `in` element names.

The transformation above is executed as a normal out-place transformation:


```groovy
def matcher = new Comparator(pk)
YAMTLGroovyExtensions.init( matcher )

matcher.loadInputModels(['model1': 'path/to/model1.xmi', 'model2': 'path/to/model2.xmi'])
matcher.execute()
matcher.saveOutputModels(['out': 'path/to/output.xmi'])
```