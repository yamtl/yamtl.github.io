package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Priority extends YAMTLModule {
	public Priority(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)

		//See the output in the target model to see the order of execution
		ruleStore([
				//Run this rule first
				rule('Flowchart2Title')
					.priority(1)
					.in("f", flowchartPk.Flowchart)
					.out("title", htmlPk.TITLE, {
						title.value = f.name 
					}),
				//Run this third
				rule('Action2Heading')
					.priority(3)
					.in("a", flowchartPk.Action)
					.out("h2", htmlPk.H2, {
						h2.value = "H2 heading for Action: " + a.name
					}),
				//Run this rule second			
				rule('Decision2Heading')
					.priority(2)
					.in("d", flowchartPk.Decision)
					.out("h1", htmlPk.H1, {
						h1.value = "H1 heading for Decision: " + d.name 
					}),
				//Finally run this rule
				rule('Transition2Heading')
					.priority(4)
					.in("t", flowchartPk.Transition)
					.out("h3", htmlPk.H3, {
						h3.value = "H3 heading for Transition: " + t.name
					})
					
				
		])
	}
}