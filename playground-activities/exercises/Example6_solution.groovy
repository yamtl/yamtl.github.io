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
                        h1.value = c_op(t, ['prefix': "${i++}. "])
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
			contextualOperation('c_op', { obj, argsMap ->
				//returns the name of the contextual instance 'obj' and argument 'suffix'
				return argsMap['prefix'].toString() + obj.name
			})
		])

    }
}