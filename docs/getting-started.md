# Getting Started

## What you will do

Create and set up a YAMTL project (without models and metamodels) that is ready for model transformations in an IDE of your choice.

## What you need

* An IDE (e.g. Eclipse, VSCode or IntelliJ)
* Java 17 or later **(Minimum requirement)**
* Gradle 8.0+ **(Minimum requirement)**
* Groovy plugin installed in your IDE (see [Choosing an IDE](yamtl-ide.md) to install it)
* Time to complete: about 10 minutes

## Walkthrough

First, you need to create a Gradle project in your IDE. Here, are the ways to do so in some common IDEs:

**Eclipse:** Create a new `Other` project. Then search for `Gradle Project`, choose a suitable starter project name, and hit ``Finish``.

**IntelliJ:** Go ``File → New → Project... → New Project``. Choose the language as ``Groovy``, build system as ``Gradle``, JDK as **17 or higher**, and Gradle DSL as ``Groovy``. 

**VSCode:** Do ``Shift+Cmd+P`` or ``Ctrl+Shift+P`` to open editor commands. Search and click on the `Gradle project` (may require `Gradle for Java` extension to be installed). Do ``Build script DSL as Groovy → New Project Name``. <br><br>

YAMTL uses Gradle as build automation tool and can be executed from Java-SE 17. To add YAMTL to your project you must configure the Gradle build script (``build.gradle``) of your project.
Add the Groovy plugin (at the top of the ``build.gradle`` file):
``` groovy
plugins {
    id "groovy"
}
```

Add the following repositories:
``` groovy
repositories {
	maven{ url 'https://github.com/yamtl/yamtl.github.io/raw/master/mvn-repo/snapshot-repo' }
	mavenCentral()
}
```

Then declare the dependencies (EMF dependencies are optional but since many metamodels use EMF format, it is advised you include it):
``` groovy
dependencies {
    // YAMTL dependencies
    implementation "yamtl:yamtl:${yamtlVersion}"

    implementation "org.apache.groovy:groovy-all:${groovyAllVersion}"
    implementation "org.eclipse.emf:org.eclipse.emf.ecore:${ecoreVersion}"
    implementation "org.eclipse.emf:org.eclipse.emf.ecore.xmi:${ecoreXmiVersion}"
    implementation "org.eclipse.emf:org.eclipse.emf.ecore.change:${ecoreChangeVersion}"
    implementation "org.eclipse.xtend:org.eclipse.xtend.core:${xtendVersion}"
    implementation "org.springframework.boot:spring-boot-starter-aop:${springAopVersion}"
    implementation "org.aspectj:org.aspectjweaver:${aspectJVersion}"
}
```

The latest versions of the dependencies are defined in the ``build.gradle`` file can be below:

* Latest ``${yamtlVersion}`` can be found at [yamtl.github.io](https://yamtl.github.io) (release notes).
* Find the latest ``${groovyAllVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.apache.groovy/groovy-all)
* Find the latest ``${ecoreVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.eclipse.emf/org.eclipse.emf.ecore)
* Find the latest ``${ecoreXmiVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.eclipse.emf/ecore-xmi)
* Find the latest ``${ecoreChangeVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.eclipse.emf/org.eclipse.emf.ecore.change)
* Find the latest ``${xtendVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.eclipse.xtend/org.eclipse.xtend.core)
* Find the latest ``${springAopVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-aop)
* Find the latest ``${aspectJVersion}`` on [Maven Central](https://mvnrepository.com/artifact/org.aspectj/aspectjweaver)

Finally, build the project to install the dependencies. 
<!-- New:Start -->
You are now ready to use your YAMTL project! Let's now learn how to create a model transformation definition.

* First, create a transformation script in `src/main/groovy` folder (you could also add a package to use multiple scripts) with the  `.groovy` suffix. Then, import a few YAMTL and EMF libraries:

``` yamtl-groovy
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF
```

* Create a specialization of the `YAMTLModule` by extending it:

```
class FirstExample extends YAMTLModule 
```

* Define a new public method `FirstExample` and pass the source and target metamodels of `EPackage` type as parameters (Ecore metamodel files are accessed through `EPackage`). **Note:** Depending on your case, you may have the same source and target metamodels so you can just pass one parameter.

``` groovy
public FirstExample(EPackage sourcePk, EPackage targetPk)
```

**OR**, if both source and target metamodels are the same:

``` groovy
public FirstExample(EPackage metamodelPk)
```

* To enable EMF functionality to the YAMTL module, initialize an EMF extension:

``` groovy
YAMTLGroovyExtensions_dynamicEMF.init(this)
```

* Within the constructor, a `header()` is required to define the signature of the transformation: declaration of input and output models. `.in()` clause defines the characteristics of the input model, where the first parameter is the model's name in quotation marks `""` and the second parameter is the metamodel to which the input model conforms. The same applies to the output model definition within the `.out()` clause. 

``` groovy
header().in("in", sourcePk).out("out", targetPk)
```

* Next is the `ruleStore()` which contains a list of rule(s). Each rule has one or more input elements which are transformed to one or more output elements. The concrete syntax for rules is described in the next section.

``` yamtl-groovy
ruleStore([
    rule('LinkedList2LinkedList')
				.in('s', llPk.LinkedList)
				.out('t', llPk.LinkedList, {
					t.nodes = fetch(s.nodes)
					t.head = fetch(allInstances(llPk.Node).find{it.next==null})
				}),
			
			rule('Node2Node')
				.in('s', llPk.Node)
				.out('t', llPk.Node, {
					t.name = s.name
					t.next = fetch(allInstances(llPk.Node).find{it.next==s})
				})
])
```

* You can also add optional helpers that can perform computations of values during the initialization of the transformation. Helpers are contained as a list within the `helperStore()` operation.

``` yamtl-groovy
helperStore([
    //Helpers
])
```

That is how you can create a YAMTL transformation script. For a better idea of a working MT definition check out this Groovy script for an [example](examples/linked-list-reversal-example.md) project:

``` yamtl-groovy
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class FirstExample extends YAMTLModule {
    
    //In this case, both source and target metamodels are same
	public FirstExample(EPackage llPk) {

		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in('in', llPk).out('out', llPk)
		
		ruleStore([
			rule('LinkedList2LinkedList')
				.in('s', llPk.LinkedList)
				.out('t', llPk.LinkedList, {
					t.nodes = fetch(s.nodes)
					t.head = fetch(allInstances(llPk.Node).find{it.next==null})
				}),
			
			rule('Node2Node')
				.in('s', llPk.Node)
				.out('t', llPk.Node, {
					t.name = s.name
					t.next = fetch(allInstances(llPk.Node).find{it.next==s})
				})
		])
	}
}
```

That's all! Now you know how to create your own YAMTL project and define a model transformation script. To learn how to use rules, see the [Language Reference](yamtl-reference.md) section. Or if you want to learn how to run YAMTL projects and configure models, head over to [Examples](examples/examples.md) so you can understand model transformations and special YAMTL operations of varying difficulties.

<!-- New:End -->
