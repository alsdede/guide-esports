// schemas/tournament.ts
const tournamentSchema = {
  name: 'tournament',
  title: 'Torneio/Tournament', 
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Torneio',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      }
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
      name: 'description_pt',
      title: 'Descrição (Português)',
      type: 'text'
    },
    {
      name: 'description_en',
      title: 'Descrição (Inglês)',
      type: 'text'
    },
    {
      name: 'game',
      title: 'Jogo',
      type: 'reference',
      to: [{type: 'game'}]
    },
    {
      name: 'startDate',
      title: 'Data de Início',
      type: 'datetime'
    },
    {
      name: 'endDate',
      title: 'Data de Fim',
      type: 'datetime'
    },
    {
      name: 'prizePool',
      title: 'Premiação',
      type: 'number'
    },
    {
      name: 'location',
      title: 'Local',
      type: 'string'
    },
    {
      name: 'isLive',
      title: 'Ao Vivo',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'image',
      title: 'Imagem do Torneio',
      type: 'image',
      options: {
        hotspot: true,
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'game.name',
      media: 'image'
    }
  }
};

export default tournamentSchema;
