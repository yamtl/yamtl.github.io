package linkedListReversal

import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class ReverseLinkedList extends YAMTLModule {
	public ReverseLinkedList(EPackage inPk, EPackage outPk) {
		/*
		 *  adds EMF extensions to interpret 
		 *  - getters/setters of an EObject: t.name instead of t.getName()
		 *  - reference to classifiers inside an EPackage: llPk.Node instead of llPk.getEClassifier('Node')
		 */
		YAMTLGroovyExtensions_dynamicEMF.init(this)

		/*
		 * declares in, out, inOut parameters for a model transformation		
		 */
		header().in('in', inPk).out('out', outPk)
		
		/*
		 * rule declaration
		 */
		ruleStore([
			rule('LinkedList2LinkedList')
				.in('s', inPk.LinkedList)
				.out('t', outPk.LinkedList, {
					t.nodes = fetch(s.nodes)
					t.head = fetch(allInstances(inPk.Node).find{it.next==null})
				}),
			
			rule('Node2Node')
				.in('s', inPk.Node)
				.out('t', outPk.Node, {
					t.name = s.name
					t.next = fetch(allInstances(inPk.Node).find{it.next==s})
				})
		])
	}
}
