# Exercise 1 - Implementation

## Base Transformation

Transformation class containing the MT definition. All rules are defined in the `ruleStore()`.

``` yamtl-groovy
package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EObject
import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example1 extends YAMTLModule {
	public Example1(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		ruleStore([
				rule('FlowchartName2Head')
						.in("flowchart", flowchartPk.Flowchart)
						.out("head", htmlPk.HEAD, {				
							head.value = flowchart.name
						})
                        //TODO: Add another output object here
                       
		])

	}
}
```

## Solution

The correct transformation definition for this problem is:

``` yamtl-groovy
package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example1 extends YAMTLModule {
	public Example1(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		ruleStore([
				rule('FlowchartName2Head')
						.in("flowchart", flowchartPk.Flowchart)
						.out("head", htmlPk.HEAD, {				
							head.value = flowchart.name
						})
						.out("html", htmlPk.HTML, {
							html.head = head 
						}),
		])

	}
}
```