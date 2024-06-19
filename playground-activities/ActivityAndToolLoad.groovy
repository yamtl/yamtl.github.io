package education_platform


import static yamtl.dsl.Helper.*
import static yamtl.dsl.Rule.*

import org.eclipse.emf.ecore.EPackage

import untypedModel.ERecord
import untypedModel.UntypedModel
import untypedModel.UntypedModelPackage
import yamtl.core.YAMTLModule
import yamtl.groovy.YAMTLGroovyExtensions
import yamtl.groovy.YAMTLGroovyExtensions_dynamicEMF

class ActivityAndToolLoad extends YAMTLModule {
	
	public FlexibleMM = UntypedModelPackage.eINSTANCE ;
	
	public ActivityAndToolLoad(EPackage activityPk) {
		YAMTLGroovyExtensions_dynamicEMF.init(this)
		header().in('yaml').out('activity', activityPk)
		ruleStore([
           rule('ActivityConfig')
	           .in('r').filter { r.activities != null && r.tool == null}
	           .out('activityConf', activityPk.ActivityConfig, {
	        	   activityConf.activities.addAll( fetch( r.activities ) )
	           }),
           rule('ToolConfig')
	           .in('r').filter { r.activities == null && r.tool != null}
	           .out('toolConf', activityPk.ToolConfig, {
					toolConf.tools.addAll( fetch( r.tool ) )
				}),
			rule('ActivityAndToolConfig')
				.in('r').filter { r.activities != null && r.tool != null}
				.out('activityConf', activityPk.ActivityConfig, {
					activityConf.activities.addAll( fetch( r.activities ) )
				})
				.out('toolConf', activityPk.ToolConfig, {
					toolConf.tools.addAll( fetch( r.tool ) )
				}),
			
			/**
			 * ACTIVITY LANGUAGE
			 */
			rule('Activity')
				.in('r').filter { r.tools && r.panels }
				.out('act', activityPk.Activity, {
					act.id = r.id
					act.title = r.title
					act.icon = r.icon
					act.tools = r.tools
					
					act.panels.addAll( fetch( r.panels ) )
					
					def layout = r.layout.get(0)
					int i = 0
					layout.area.each { 
						act.layout.add( fetch( layout, i++ )  )
					}
					
					if (r.actions)
						act.actions.addAll( fetch( r.actions ))
				}),
			
			rule('Panel')
				.in('r').filter { r.name && r.ref}
				.out('p', activityPk.Panel, {
					p.id = r.id
					p.name = r.name
					p.refId = r.ref
					if (r.buttons)
						p.buttons.addAll( fetch( r.buttons ) )
				}),
				
			rule('CompositePanel').inheritsFrom(['Panel'])
				.in('r').filter {  r.name && r.ref && r.childPanels != null }
				.out('p', activityPk.CompositePanel, {
					p.childPanels.addAll( fetch(r.childPanels) )
				}),
				
			rule('LayoutRow').toMany()
				.in('r').filter{ r.area != null }
				.toManyCap{r.area.size()}
				.out('row', activityPk.LayoutRow, {
					
					r.area[matchCount].each { 
						def panelRef = findPanelById(['id': it])
						row.columns += fetch(panelRef) 
					}
				}),
			
			rule('ButtonRef')
			  	.in('r').filter{ r.targetPanel instanceof String && r.targetPanel}
				.out('b', activityPk.ButtonRef, {
					b.id = r.id
					b.icon = r.icon
					b.hint = r.hint
					b.internalFunction = r.internal
					b.targetPanel = fetch(findPanelById(['id': r.targetPanel]))
				}),
			
			rule('Action')			  	
				.in('r').filter{ r.source && r.sourceButton}
				.out('b', activityPk.Action, {
					b.sourcePanel = fetch(findPanelById(['id': r.source]))
					b.output = fetch(findPanelById(['id': r.output]))
					b.outputType = r.outputType
					if (r.outputConsole)
						b.outputConsole = fetch(findPanelById(['id': r.outputConsole]))
					b.sourceButton = fetch(findButtonById(['id': r.sourceButton])) // FIX: this should only be an IDs
					
					// Each attribute needs to be translated to a param 
					r.parameters.each{param ->
						b.arguments.addAll( fetch(param.attributes, 'arg', 'Argument') )
					}
				}),
			
			rule('Argument').isUniqueLazy()
			  	.in('att', FlexibleMM.attributeValue)
				.out('arg', activityPk.Argument, {
					arg.key = att.key
					arg.value = att.value
				}),
				
			/**
			 * TOOL LANGUAGE
			 */
		
			rule('Tool')
				.in('r').filter { r.functions != null || r.panelDefs != null}
				.out('tool', activityPk.Tool, {
					tool.id = r.id
					tool.name = r.name
					tool.version = r.version
					tool.homepage = r.homepage
					
					if (r.functions)
						tool.functions.addAll( fetch( r.functions ) )					
					if (r.panelDefs)
						tool.panelDefs.addAll( fetch( r.panelDefs ) )					
				}),
			
			rule('ToolFunction')
				.in('r').filter { r.parameters != null && r.returnType != null}
				.out('f', activityPk.ToolFunction, {
					f.id = r.id
					f.name = r.name
					f.returnType = r.returnType
					f.path = r.path
					f.parameters.addAll( fetch( r.parameters, 'param', 'Parameter', ['parameters' : r.parameters] ) )
				}),
			
			rule('Parameter').isUniqueLazy()
				.in('r')
				.out('param', activityPk.Parameter, {
					param.name = r.name
					param.type = r.type
					if (r.instanceOf) {
						def record_param = parameters.find{it.name==r.instanceOf}
						param.instanceOf = fetch(record_param, 'param', 'Parameter', ['parameters' : r.parameters])
					}
				}),
			
			rule('PanelDefinition')
				.in('r').filter { r.panelclass != null }
				.out('panel', activityPk.PanelDefinition, {
					panel.id = r.id
					panel.name = r.name
					panel.panelClass = r.panelclass
					panel.icon = r.icon
					panel.language = r.language
					if (r.buttons)
						panel.buttons.addAll( fetch(r.buttons) )
				}),
		
			rule('ActionButton')
				.in('r').filter{ r.actionfunction != null }
				.out('b', activityPk.ActionButton, {
					b.id = r.id
					b.icon = r.icon
					b.hint = r.hint
					def f = findFunctionById(['id': r.actionfunction])
					b.actionFunction = fetch(findFunctionById(['id': r.actionfunction]))
			    }),
				
			rule('HelpButton')
				.in('r').filter{ r.url != null }
				.out('b', activityPk.HelpButton, {
					b.id = r.id
					b.icon = r.icon
					b.hint = r.hint
					b.url = r.url
				})
		])
		
		helperStore([
			staticOperation('findPanelById', { 
				return allInstances(FlexibleMM.ERecord)
					.findAll{ it.name && it.ref }
					.find{ it.id == id }	
			}),
			staticOperation('findButtonById', { 
				return allInstances(FlexibleMM.ERecord)
					.findAll{ r.targetPanel instanceof String && r.targetPanel }
					.find{ it.id == id }
			}),
			staticOperation('findParameterByName', { 
				return allInstances(FlexibleMM.ERecord)
					.findAll{ r.name instanceof String && r.name && r.type instanceof String && r.type }
					.find{ it.name == name }
			}),
			staticOperation('findFunctionById', { 
				return allInstances(FlexibleMM.ERecord)
					.findAll{ it.parameters != null && it.returnType != null }
					.find{ it.id == id }
			})
		])
	}
	
}
