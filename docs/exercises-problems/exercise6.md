# Exercise 6

In the final task of this tutorial, we will look at various types of helper functions in YAMTL and use such functions to provide additional capabilties to model transformations.

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
<xmi:XMI xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns="HTML">
  <H1 value="[Wake up, Sleep, Get up, begin]"/>
  <H1 value="[Wake up, Sleep, Get up, begin]"/>
  <H1 value="[Wake up, Sleep, Get up, begin]"/>
  <H1 value="[Wake up, Sleep, Get up, begin]"/>
  <H1 value="[Sleep, Get up]"/>
  <H1 value="1. "/>
  <H1 value="2. Yes"/>
  <H1 value="3. Some Time Passes"/>
  <H1 value="4. No"/>
  <H1 value="5. start"/>
</xmi:XMI>
```

## Task

A transformation script containing `staticAttribute` and `staticOperation` helper types has already been defined in the base transformation. Check out those helper functions and write the final helper type called `contextualOperation` that takes in two arguments: an object and an argument map, then returns the concatenation of the arguments map object's string value and the first argument object's name. Use this `contextualOperation` to create reusable function that appends an increment counter prefix to the name of the input object. Let's see how this can be done.

In `Transition2Heading` rule, set the value of `h1` object to a function call `c_op()` (the returned value will be set as the h1.value). `c_op(<object>, [<listOfArgumentMap>])` contains an `<object>` (in this case we need to pass the input object 't') and `[<listOfArgumentMap>]` (this has one key 'prefix' and a value as the increment counter `i`).

Create a new contextual operation helper function as `contextualOperation('<operationName>', {obj, argsMapExpression})` within the `helperStore()`. `<operationName>` is the name of the operation that you want to define i.e. `c_op`. `obj` is the first argument passed into the function call within the `Transition2Heading` rule. `argsMapExpression` is a lambda expression as seen in the `staticOperation` before. You only need to define a single statement that returns the concatenation of the value of the key 'prefix' (which was passed into `argsMap` as a key-value pair before) and the name of the `obj` object.

That's all! Let's summarise the steps we did before. To set the value of `h1` object of `Transition2Heading`, we called a helper function `c_op` and passed the input `Transition` object 't' and a list of arguments map with one key-value pair (specifically a variable `i` was provided to the function). Then we defined the contextual operation helper that returns the concatenated string of the calculation made with both arguments `obj` and map value. Remember, this function is reusable in any other rule which could lead to efficient code. 

## Base Transformation

Transformation class containing the MT definition. All rules are defined in the `ruleStore()`.

``` yamtl-groovy
package flowchartToHtmlExamples

import static yamtl.dsl.Helper.*
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example6 extends YAMTLModule {
	public int i = 1
	
    public Example6(EPackage flowchartPk, EPackage htmlPk) {
        YAMTLGroovyExtensions_dynamicEMF.init(this)

        header().in('in', flowchartPk).out('out', htmlPk)

        ruleStore([
            rule('Action2Heading')
                    .in("a", flowchartPk.Action)
                    .out("h1", htmlPk.H1, {					
						h1.value = att.toString()
                    }),
            rule('Decision2Heading')
                    .in("d", flowchartPk.Decision)
                    .out("h1", htmlPk.H1, {
                        h1.value = op(['obj': d])
                    }),
            rule('Transition2Heading')
                    .in("t", flowchartPk.Transition)
                    .out("h1", htmlPk.H1, {
                        //TODO: Set value of h1 as the value returned from contextual operation

                    }) 
        ])
		
		helperStore([
			staticAttribute('att', { 				
				def actionList = []
				for (anAction in allInstances(flowchartPk.Action)) {
					actionList.add(anAction.name)
				}
				
				//returns all instances of Action elements from the source model
				return actionList
			}),
			staticOperation('op', { argsMap ->
				def aTransition = (flowchartPk.Transition as EClass)
				aTransition = argsMap.obj.outgoing
				
				//The name of the target node of the outgoing transition from 'd' Decision element
				return aTransition.target.name.toString()
			}),
            //TODO: Create a contextualOperation helper function that has 2 parameters




		])

    }
}
```


To solve this exercises interactively, go to the [YAMTL playground](https://yamtl.github.io/playground/?activities=https://yamtl.github.io/playground-activities/yamtl-exercises-activity.yml).

A downloadable solution can be found [here](https://github.com/yamtl/examples/tree/master/FlowchartToHTML_exercises).