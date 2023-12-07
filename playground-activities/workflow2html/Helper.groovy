package flowchartToHtmlExamples

import static yamtl.dsl.Rule.*
import static yamtl.dsl.Helper.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF
import yamtl.groovy.YAMTLGroovyExtensions

class Helper extends YAMTLModule {
	public int i = 0
	
    public Helper(EPackage flowchartPk, EPackage htmlPk) {
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
                        h1.value = c_op(t, ['suffix': "_${i++}"])
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
				//returns the argument 'obj'
				return argsMap.obj.name
			}),
			contextualOperation('c_op', { obj, argsMap ->
				//returns the name of the contextual instance 'obj' and argument 'suffix'
				return obj.name + argsMap['suffix']
			})
		])

    }
}