# Exercise 4 - Implementation

## Base Transformation

Transformation class containing the MT definition. All rules are defined in the `ruleStore()`.

``` yamtl-groovy
package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example4 extends YAMTLModule {
	public Example4(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		ruleStore([
			rule('Node2TableRows')
				.in("n", flowchartPk.Node)
				.out("name", htmlPk.TD, {
					name.value = n.name 
				})
				.out("from", htmlPk.TD, {
					from.value = n.incoming.name.toString()
				})
				.out("to", htmlPk.TD, { 
					to.value = n.outgoing.name.toString()
				})
				.out("tr", htmlPk.TR, {
					//TODO: Add name object to 1st column

					//TODO: Add from object to 2nd column

					//TODO: Add to object to 3rd column

				}),
			rule('Flowchart2Table')
				.in("f", flowchartPk.Flowchart)
				.out("headingName", htmlPk.TH, {
					headingName.value = "Node"
				})
				.out("headingIncoming", htmlPk.TH, {
					headingIncoming.value = "Incoming Transition(s)"
				})
				.out("headingOutgoing", htmlPk.TH, {
					headingOutgoing.value = "Outgoing Transition(s)"
				})
				.out("headingRow", htmlPk.TR, {
					//TODO: Add headingName object to 1st column

					//TODO: Add headingIncoming object to 2nd column

					//TODO: Add headingOutgoing object to 3rd column

				})
				.out("table", htmlPk.TABLE, {
					//TODO: Add heading row

					//TODO: Add all table rows using fetch operation

				})
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

class Example4 extends YAMTLModule {
	public Example4(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		ruleStore([
			rule('Node2TableRows')
				.in("n", flowchartPk.Node)
				.out("name", htmlPk.TD, {
					name.value = n.name 
				})
				.out("from", htmlPk.TD, {
					from.value = n.incoming.name.toString()
				})
				.out("to", htmlPk.TD, { 
					to.value = n.outgoing.name.toString()
				})
				.out("tr", htmlPk.TR, {
					//Add name object to 1st column
					tr.tds.add(name)
					//Add from object to 2nd column
					tr.tds.add(from)
					//Add to object to 3rd column
					tr.tds.add(to)
				}),
			rule('Flowchart2Table')
				.in("f", flowchartPk.Flowchart)
				.out("headingName", htmlPk.TH, {
					headingName.value = "Node"
				})
				.out("headingIncoming", htmlPk.TH, {
					headingIncoming.value = "Incoming Transition(s)"
				})
				.out("headingOutgoing", htmlPk.TH, {
					headingOutgoing.value = "Outgoing Transition(s)"
				})
				.out("headingRow", htmlPk.TR, {
					//Add headingName object to 1st column
					headingRow.tds.add(headingName)
					//Add headingIncoming object to 2nd column
					headingRow.tds.add(headingIncoming)
					//Add headingOutgoing object to 3rd column
					headingRow.tds.add(headingOutgoing)
				})
				.out("table", htmlPk.TABLE, {
					//Add heading row
					table.trs.add(headingRow)
					//Add all table rows using fetch operation
					table.trs.addAll(fetch(f.nodes, "tr"))
				})
		]) 
	}
}
```