package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*
import org.eclipse.emf.ecore.EPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class Example2 extends YAMTLModule {
	public Example2(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)
		
		ruleStore([
            //TODO: Update the rule with a .filter{} block
			rule('SelectedTransitions2Text')
				.in("t", flowchartPk.Transition)
				.out("p", htmlPk.P, {
					p.value = "Node: ${t.source.name} --> Transition: ${t.name}".toString()
				})
		])

	}
}