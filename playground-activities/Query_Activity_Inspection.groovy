[
	contextType: 'Action',
	where: { it.outputType == 'puml' },
	query: { 
		println("""
${it.sourcePanel?.id} |-{${it.sourceButton?.id ?: 'MISSING'}(${
    it.arguments.collect { it.key + '=' + it.value }.join(', ')
})}-> ${it.output?.id} [${it.outputConsole?.id ?: ''}]
""")
	}
]