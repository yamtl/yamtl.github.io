package flowchartToHtmlExamples
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class ModuleComposition extends Inheritance {
	public ModuleComposition(EPackage flowchartPk, EPackage htmlPk) {
		super(flowchartPk, htmlPk)
 
		ruleStore([

				rule('Subflow2H1')
						.inheritsFrom(['Flowchart2H1'])
						.in("e", flowchartPk.Subflow)
						.out("h1", htmlPk.H1, {
							h1.value = "${h1.value}, where name of subflow is ${e.name}".toString()							
						})
		])
}}