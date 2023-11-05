# Exercise 4

This task involves the use of fetching matched output objects from other rules. This is done using the YAMTL fetch() operation.

## Input Model

Source model representing the flowchart instance (in XMI format) conforming to the flowchart domain is as follows:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<flowchart:Flowchart xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:flowchart="flowchart" xmi:id="_9mLMwDY6EeOwt8pm-kjW_Q" name="Wakeup">
  <nodes xsi:type="flowchart:Action" xmi:id="_9mLMwTY6EeOwt8pm-kjW_Q" name="Wake up" outgoing="_9mLMxjY6EeOwt8pm-kjW_Q" incoming="_9mLMyDY6EeOwt8pm-kjW_Q _9mLz0TY6EeOwt8pm-kjW_Q"/>
  <nodes xsi:type="flowchart:Decision" xmi:id="_9mLMwjY6EeOwt8pm-kjW_Q" name="Is it really too early?" outgoing="_9mLMxzY6EeOwt8pm-kjW_Q _9mLz0DY6EeOwt8pm-kjW_Q" incoming="_9mLMxjY6EeOwt8pm-kjW_Q"/>
  <nodes xsi:type="flowchart:Action" xmi:id="_9mLMwzY6EeOwt8pm-kjW_Q" name="Sleep" outgoing="_9mLMyDY6EeOwt8pm-kjW_Q" incoming="_9mLMxzY6EeOwt8pm-kjW_Q"/>
  <nodes xsi:type="flowchart:Action" xmi:id="_9mLMxDY6EeOwt8pm-kjW_Q" name="Get up" incoming="_9mLz0DY6EeOwt8pm-kjW_Q"/>
  <nodes xsi:type="flowchart:Action" xmi:id="_9mLMxTY6EeOwt8pm-kjW_Q" name="begin" outgoing="_9mLz0TY6EeOwt8pm-kjW_Q"/>
  <transitions xmi:id="_9mLMxjY6EeOwt8pm-kjW_Q" name="" source="_9mLMwTY6EeOwt8pm-kjW_Q" target="_9mLMwjY6EeOwt8pm-kjW_Q"/>
  <transitions xmi:id="_9mLMxzY6EeOwt8pm-kjW_Q" name="Yes" source="_9mLMwjY6EeOwt8pm-kjW_Q" target="_9mLMwzY6EeOwt8pm-kjW_Q"/>
  <transitions xmi:id="_9mLMyDY6EeOwt8pm-kjW_Q" name="Some Time Passes" source="_9mLMwzY6EeOwt8pm-kjW_Q" target="_9mLMwTY6EeOwt8pm-kjW_Q"/>
  <transitions xmi:id="_9mLz0DY6EeOwt8pm-kjW_Q" name="No" source="_9mLMwjY6EeOwt8pm-kjW_Q" target="_9mLMxDY6EeOwt8pm-kjW_Q"/>
  <transitions xmi:id="_9mLz0TY6EeOwt8pm-kjW_Q" name="start" source="_9mLMxTY6EeOwt8pm-kjW_Q" target="_9mLMwTY6EeOwt8pm-kjW_Q"/>
</flowchart:Flowchart>
```

## Expected Output Model

``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<TABLE xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="HTML">
  <trs>
    <tds xsi:type="TH" value="Node"/>
    <tds xsi:type="TH" value="Incoming Transition(s)"/>
    <tds xsi:type="TH" value="Outgoing Transition(s)"/>
  </trs>
  <trs>
    <tds value="Wake up"/>
    <tds value="[Some Time Passes, start]"/>
    <tds value="[]"/>
  </trs>
  <trs>
    <tds value="Is it really too early?"/>
    <tds value="[]"/>
    <tds value="[Yes, No]"/>
  </trs>
  <trs>
    <tds value="Sleep"/>
    <tds value="[Yes]"/>
    <tds value="[Some Time Passes]"/>
  </trs>
  <trs>
    <tds value="Get up"/>
    <tds value="[No]"/>
    <tds value="[]"/>
  </trs>
  <trs>
    <tds value="begin"/>
    <tds value="[]"/>
    <tds value="[start]"/>
  </trs>
</TABLE>
```

## Task

A partial solution for the transformation of Node elements into Table form is made available (as seen in the base transformation code). You must understand the hints given in the single line comments to implement a line of code for each comment. Complete all the lines to be able to run and view the target model. Refer to the [target metamodel](../exercises/flowchart-to-html-worksheet.md#target-metamodel) (html.emf) to find attributes of TR and TABLE elements. 

HINT: the syntax for fetch operation in this example is `fetch(<inputMatchedObject>, “<outputObject>”)` where `<inputMatchedObject>` is all nodes of the flowchart and `“<outputObject>”` is the name of the output object in double quotes. Also, remember that you use a Groovy inbuilt function to add an object.

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

## Test Script

This is a separate Groovy class that loads, executes and tests the model transformation. In particular, the source and target metamodels are loaded and passed to the transformation class. Then, the input model is loaded into this class and executed. Thus, creating an output model which is stored and tested for correctness.

``` groovy
package flowchartToHtmlExamples
import static org.junit.Assert.assertTrue;
import org.junit.jupiter.api.Test
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.utils.EMFComparator

class Example4Test extends YAMTLModule {
	final BASE_PATH = 'model'

	@Test
	def void testExample4() {
		// model transformation execution
		def srcRes = YAMTLModule.preloadMetamodel(BASE_PATH + '/flowchart.ecore')
		def tgtRes = YAMTLModule.preloadMetamodel(BASE_PATH + '/html.ecore')

		def xform = new Example4(srcRes.contents[0], tgtRes.contents[0])
		YAMTLGroovyExtensions.init(this)
		xform.loadInputModels(['in': BASE_PATH + '/wakeup.xmi'])
		xform.execute()
		xform.saveOutputModels(['out': BASE_PATH + '/example4Output.xmi'])
		
		// test assertion
		def actualModel = xform.getOutputModel('out')
		EMFComparator comparator = new EMFComparator();
		
		// Load the expected model using the identical output metamodel from the transformation.
		// Essentially, use the same in-memory metamodel.
		xform.loadMetamodelResource(tgtRes)
		def expectedResource = xform.loadModel(BASE_PATH + '/example4ExpectedOutput.xmi', false)
		def assertionResult =  comparator.equals(expectedResource.getContents(), actualModel.getContents())
		assertTrue(assertionResult);
	}
}
```