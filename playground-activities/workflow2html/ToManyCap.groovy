package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import groovy.swing.factory.TitledBorderFactory
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class ToManyCap extends YAMTLModule {
    public ToManyCap(EPackage flowchartPk, EPackage htmlPk) {
        YAMTLGroovyExtensions_dynamicEMF.init(this)

        header().in("in", flowchartPk).out("out", htmlPk)

        ruleStore([
            rule('Action2Elements')
				.toMany()
                .in("d", flowchartPk.Decision)
				.toManyCap({2})
                .out("title", htmlPk.H1, {
					// The value will differ every time the rule is re-applied
					title.value += d.name 
                })
                .out("link", htmlPk.A, {
					// Access the current number of rule application
					// using matchCount variable
					if (matchCount == 0) {
						link.name = "Transition link 1"
						link.value = fetch(d, "title", 0).value
						link.ahref = d.outgoing[0].name
					} else {
						link.name = "Transition link 2"
						link.value = fetch(d, "title", 1).value
						link.ahref =  d.outgoing[1].name
					}
                })
                .out("container", htmlPk.DIV, {	
					// Fetch the correct title and link for the current rule matching
					container.value = "Decision ${matchCount+1}".toString()
                    container.children.add(fetch(d, "title", matchCount))
                    container.children.add(fetch(d, "link", matchCount))
                })

        ])
    }
}