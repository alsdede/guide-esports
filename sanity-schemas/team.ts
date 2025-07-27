// schemas/team.ts
const teamSchema = {
  name: 'team',
  title: 'Time/Team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Time',
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
      name: 'logo',
      title: 'Logo do Time',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'country',
      title: 'País',
      type: 'string'
    },
    {
      name: 'region',
      title: 'Região',
      type: 'string',
      options: {
        list: [
          {title: 'América do Norte', value: 'na'},
          {title: 'Europa', value: 'eu'},
          {title: 'Coreia do Sul', value: 'kr'},
          {title: 'China', value: 'cn'},
          {title: 'Brasil', value: 'br'},
          {title: 'América Latina', value: 'latam'},
          {title: 'Oceania', value: 'oce'},
          {title: 'Japão', value: 'jp'}
        ]
      }
    },
    {
      name: 'games',
      title: 'Jogos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'game'}]
        }
      ]
    },
    {
      name: 'founded',
      title: 'Fundado em',
      type: 'date'
    },
    {
      name: 'isActive',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'logo'
    }
  }
};

export default teamSchema;
