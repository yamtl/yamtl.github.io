package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class MultipleSources extends YAMTLModule {
	public MultipleSources(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)

		ruleStore([
				rule('SelectedTransitions2Text')
						// This rule contains 3 input patterns
						// Multiple sources create a cartesian product of output elements
						// So filters are needed to avoid creating unwanted elements
						.in("a", flowchartPk.Action)
						.filter {
							// Filter out those actions that do not have outgoing transitions
							!a.outgoing.isEmpty()
						}
						.in("d", flowchartPk.Decision)
						.in("t", flowchartPk.Transition)
						.filter{						
								// Only transform actions that match the input transition name
								// OR
								// decision elements that contain the input transition name
								a.outgoing.name[0] == t.name || d.outgoing.name.contains(t.name)
							}
						.out("p", htmlPk.P, {

						// Create <p> elements with source, transition, and target info for action and decision elements
						// Multiple duplicates of the decision element will be created showcasing the cartesian product behaviour
							if(a.outgoing.name[0] == t.name) {
								p.value = "Source: ${a.name}; Transition: ${t.name}; Target: ${t.target.name}".toString()
							} else if(d.outgoing.name[0] == t.name) {
								p.value = "Source: ${d.name}; Transition: ${t.name}; Target: ${t.target.name}".toString()
							} else if(d.outgoing.name[1] == t.name) {
								p.value = "Source: ${d.name}; Transition: ${t.name}; Target: ${t.target.name}".toString()
							}
						})
		])

	}
}