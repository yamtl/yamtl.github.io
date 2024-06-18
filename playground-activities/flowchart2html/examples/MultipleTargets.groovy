package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class MultipleTargets extends YAMTLModule {
	public MultipleTargets(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)

		ruleStore([
				rule('Action2Elements')
						// This rule has 1 input pattern and 3 output patterns
						// All output objects are mapped to the same input object
						.in("a", flowchartPk.Action)
						.filter { !a.outgoing.isEmpty() }
						.out("title", htmlPk.H1, {
							title.value = a.name
						})
						.out("link", htmlPk.A, {
							link.value = "Next steps"
							link.ahref = a.outgoing.first().target.name
						})
						.out("container", htmlPk.DIV, {
							// Other output variables can be referred to directly
							container.children.add(title)
							container.children.add(link)
						})
		])
	}
}