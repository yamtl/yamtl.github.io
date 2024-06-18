# Exercise 5

For this task, you will need to implement a model transformation definition containing a lazy rule.

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
<DIV xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="HTML">
  <children xsi:type="H1" value="Wake up"/>
  <children xsi:type="H1" value="Is it really too early?"/>
  <children xsi:type="H1" value="Sleep"/>
  <children xsi:type="H1" value="Get up"/>
  <children xsi:type="H1" value="begin"/>
  <children xsi:type="H1" value=""/>
  <children xsi:type="H1" value="Yes"/>
  <children xsi:type="H1" value="Some Time Passes"/>
  <children xsi:type="H1" value="No"/>
  <children xsi:type="H1" value="start"/>
</DIV>
```

## Task

Within the skeleton version of the base transformation script provided below, you must create a lazy rule, non-lazy rule, another rule that fetches the outputs of the first two rules.

1. Define a lazy rule ‘Node2H1’ with an input object ‘in’ of the type ‘Node’ and an output object ‘out’ of the type ‘H1’. The ‘out’ object’s value should be set to the name of ‘in’ object.
2. Define a regular rule ‘Transition2H1’ with an input object ‘t’ of the type ‘Transition’ and an output object ‘h1’ of the type ‘H1’. Set the value of h1 to be the name of ‘t’.
3. Create a final rule ‘Flowchart2DIV’. It must have an input object ‘f’ with the ‘Flowchart’ type. The output object’s name should be ‘div’ and of the type ‘DIV’. We will add all transformed nodes and transitions objects into a ‘DIV’ block. So, access the ‘div’ object’s children attribute and perform the function `addAll()` to add multiple nodes into the ‘div’ block. Remember, lazy rules are only invoked if they are called using a fetch operation from another rule and in this case, it must be defined as an argument to `addAll()` function. Thus, we will use the operation `fetch(<inputMatchedObject>, <outputObject>, <ruleName>)` where `<inputMatchedObject>` is the flowchart nodes i.e., `f.nodes`, `<outputObject>` is the name of the output object to be added to the ‘div’ block and `<ruleName>` is the name of the rule containing `<outputObject>`. Unlike lazy rules, you do not need a verbose fetch operation for non-lazy rules. Create another `div.children.addAll()` in the lambda expression of the ‘div’ output object and use the function `fetch(<inputMatchedObject>)` whose argument would be all transitions of flowchart ‘f’ (i.e. f.transitions).

Once you have completed all the steps you can run the Groovy script. In the target model, you will notice that all node and transition elements are transformed into `H1` headings and are part of a `DIV` block.

## Base Transformation

Transformation class containing the MT definition. All rules **must** be defined in the `ruleStore()`.

``` yamtl-groovy
package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example5 extends YAMTLModule {
	public Example5(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)

		ruleStore([
            //TODO: Create a lazy rule

            //TODO: Create a non-lazy/regular rule

            //TODO: Create a rule that fetches the outputs of the first two rules
		])

	}

}
```


To solve this exercises interactively, go to the [YAMTL playground](https://yamtl.github.io/playground/?activities=https://yamtl.github.io/playground-activities/yamtl-exercises-activity.yml).

A downloadable solution can be found [here](https://github.com/yamtl/examples/tree/master/FlowchartToHTML_exercises).