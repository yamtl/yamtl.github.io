package flowchartToHtmlExamples

import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Query extends YAMTLModule {
	
	public int count = 0
	
    public Query(EPackage flowchartPk) {
        YAMTLGroovyExtensions_dynamicEMF.init(this)

        header().in('in', flowchartPk)

        ruleStore([

                rule('Transition')
                    .in('t', flowchartPk.Transition)
                    .query()
					.endWith{
						count++
						println("processed successfully")
					}
                    
        ])

    }
}