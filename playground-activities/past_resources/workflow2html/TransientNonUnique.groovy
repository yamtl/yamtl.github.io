package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class TransientNonUnique extends YAMTLModule {
	public TransientNonUnique(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		// an attribute shared among rules
		def count = 0
		
		// These rules have a problem because both rules can match the same Flowchart object
		ruleStore([
			rule('Transitions2Div')
				.isTransient()
				.in("f", flowchartPk.Flowchart)
				.out("div", htmlPk.DIV, {
					div.children.addAll(f.transitions)
					count += div.children.size()
					println(count)
				}),			
			rule('TransitionsCount')
				.in("flowchart", flowchartPk.Flowchart)
				.out("h1", htmlPk.H1, {
					h1.value = "The ${flowchart.name} flowchart has ${count} transitions".toString()
					println(h1.value)
				})
		])
	}
}