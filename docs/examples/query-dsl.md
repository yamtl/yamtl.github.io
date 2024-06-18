---
hide:
  - path
---

# Model Queries atop YAMTL

Model queries in model-driven engineering applications are specialized queries designed to extract, manipulate, or analyze specific information from models that represent complex systems. These models, which may depict software architecture, business processes, or system behaviors, are central to the engineering process. Model queries enable developers to efficiently retrieve data, check model consistency, perform transformations, and validate system specifications against predefined criteria. By providing a mechanism to interact with models at a high level of abstraction, model queries facilitate automation, enhance accuracy, and improve the efficiency of model-driven development workflows.

In this example, we introduce a QueryDsl to perform model queries atop YAMTL. For the example we are going to use a simple class diagram metamodel:

<figure markdown>
    ```mermaid
    classDiagram
        class NamedElt {
            <<abstract>>
            name: String
        }
        class Classifier {
            <<abstract>>
        }
        class Package {
        }
        class Class {
            isAbstract: Boolean = false
        }
        class Attribute {
            multiValued: Boolean  = false
        }
        class DataType {
        }
        NamedElt <|-- Classifier
        NamedElt <|-- Attribute
        Classifier <|-- Package
        Classifier <|-- DataType    
        Classifier <|-- Class
        Class "0..*" --> "0..*" Class : ~super
        Class "1" *--> "0..*" Attribute : ~attr
        Attribute "1" --> "1" Classifier : type
        Package "0..*" *--> "0..*" Classifier : classifiers
    ```
  <figcaption>Metamodel Simple Class Diagram</figcaption>
</figure>



## Model Queries

The YAMTL QueryDsl is a Groovy DSL for evaluating model queries over EMF models. A model query is internally encoded as a match-only YAMTL model transformation that uses the [YAMTL pattern matching semantics](https://yamtl.github.io/yamtl-reference.html#pattern-matching-semantics).

A model query is defined using JSON-style syntax with Groovy closures as follows:

```groovy
[
    'context': '<ContextType>',
    'where': '<FilterClosure>',
    'query': '<QueryClosure>'
]
```

where:

* `<ContextType>` is a class name in the metamodel denoting the type for the contextual instances for the `where` and `query` clauses.
* `<FilterClosure>` is a Groovy closure, whose parameter corresponds to an instance of the `<ContextType>`, specifying a boolean condition that must be satisfied by the contextual instance in order for the query to be evaluated. This parameter is optional, and when it is not specified, all contextual instances will be considered for the evaluation of the query.
* `<QueryClosure>` is a Groovy closure, whose parameter corresponds to an instance of the `<ContextType>`, specifying a query. The query can be used to print some results in the output console or to gather information in variables.

For example, the following query checks whether all classifiers within a package have unique names:

```groovy
[
    context: 'Package',
    query: { 
        def idCounts = it.classifiers.countBy { it.name }
        def repeatedIds = idCounts.findAll { k, v -> v > 1 }.keySet()
        result = repeatedIds.size()
    }
]
```

In the example above, all classifiers within the selected package will be evaluated because a `where` clause has not been specified.

The following example checks that class names are unique globally, not just within each package:

```groovy
def classNamesSet = [] as Set<String>		
def queryDef = [
    context: 'Class',
    query: {
        def added = classNamesSet.add(it.name)
        if (!added) println("Error: ${it.name} is used for more than one class.")
    }
]
```

The query above illustrates how to capture side effects in a global variable `classNamesSet`, declared outside of the query.

The next example checks that all attributes within a particular class have unique names, for those classes with at least one attribute:

```groovy
[
    context: 'Class',
    where: { it.attr.size() > 0 },
    query: {
        def idCounts = it.attr.countBy { it.name }
        def repeatedIds = idCounts.findAll { k, v -> v > 1 }.keySet()
        result = repeatedIds.size()
    }
]
```

A model query is then executed using the `runQuery` command:

```groovy
runQuery('path/to/metamodel.emf', 'path/to/model.xmi', query)
```

## Translating QueryDsl into YAMTL

Internally, a QueryDsl query is translated into a `YAMTLModule` where the `<ContextType>` and the `<FilterClosure>` are used to define a pattern in a YAMTL rule with a single input element, while the `<QueryClosure>` is used as a post-rule operation as follows:

```groovy
class QueryActivityDsl extends YAMTLModule {

	def EPackage activityPk
	
	QueryActivityDsl(EPackage activityPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)
		this.activityPk=activityPk
		header().in('activity', activityPk)
	}
	
	void context(Map args) {
		def context = args.context
		
		if (!context) {
			throw new RuntimeException("The context type needs to be given.")
		}
		def where = args.where ?: { true }
		def query = args.query ?: { println(self.toString()) }
		
		ruleStore([
			rule('Query')
				.in('self', YAMTLGroovyExtensions_dynamicEMF.findEClass(activityPk, context))
				.filter({ where.call(self) })
				.query()
				.endWith({ query.call(self) })
		])
    }
}
```

The code for the query DSL and example can be found [here](https://github.com/yamtl/examples/tree/master/query_dsl) (`src/main/groovy/queryDsl` contains the definition of transformations and `src/test/groovy/queryDsl` how to execute them with some example models).
