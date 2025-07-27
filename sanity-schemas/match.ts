// schemas/match.ts
export default {
  name: 'match',
  title: 'Partida/Match',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Partida',
      type: 'string'
    },
    {
      name: 'title_pt',
      title: 'Título (Português)',
      type: 'string'
    },
    {
      name: 'title_en',
      title: 'Título (Inglês)',
      type: 'string'
    },
    {
      name: 'tournament',
      title: 'Torneio',
      type: 'reference',
      to: [{type: 'tournament'}]
    },
    {
      name: 'team1',
      title: 'Time 1',
      type: 'reference',
      to: [{type: 'team'}]
    },
    {
      name: 'team2',
      title: 'Time 2', 
      type: 'reference',
      to: [{type: 'team'}]
    },
    {
      name: 'startTime',
      title: 'Horário de Início',
      type: 'datetime'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Agendada', value: 'scheduled'},
          {title: 'Ao Vivo', value: 'live'},
          {title: 'Finalizada', value: 'finished'},
          {title: 'Cancelada', value: 'cancelled'}
        ]
      },
      initialValue: 'scheduled'
    },
    {
      name: 'score1',
      title: 'Pontuação Time 1',
      type: 'number'
    },
    {
      name: 'score2',
      title: 'Pontuação Time 2',
      type: 'number'
    },
    {
      name: 'odds1',
      title: 'Odds Time 1',
      type: 'number'
    },
    {
      name: 'odds2',
      title: 'Odds Time 2',
      type: 'number'
    },
    {
      name: 'streamUrl',
      title: 'URL da Stream',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tournament.name'
    }
  }
}
