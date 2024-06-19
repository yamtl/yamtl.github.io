package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class EndWith extends YAMTLModule {
	public EndWith(EPackage flowchartPk, EPackage htmlPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		header().in("in", flowchartPk).out("out", htmlPk)

		ruleStore([
				rule('Flowchart2Body')
						//Notice there is one source and multiple targets
						.in("f", flowchartPk.Flowchart)
						.out("b", htmlPk.B, { 
							//Flowchart's name is turned into bold
							b.value = f.name 
						})
						.out("div", htmlPk.DIV, {
							//A div block contains all model transitions 
							div.children.addAll(f.transitions) 
						})
						.out("body", htmlPk.BODY, {
							//All flowchart nodes are added to the body
							body.children.addAll(f.nodes)
						})//Last block of the transformation to be executed
						.endWith({
							//You can access the input object(s)
							body.text = f.name

							//Similarly, you can access all output object(s)
							body.children.add(b) 
							body.children.add(div)
						})
		])

	}
}