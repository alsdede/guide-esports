// Esquemas para o Sanity Studio
// Coloque estes arquivos na pasta sanity/schemas/

// schemas/game.ts
export default {
  name: 'game',
  title: 'Jogo/Game',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Jogo',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
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
      name: 'image',
      title: 'Imagem do Jogo',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'MOBA', value: 'moba'},
          {title: 'FPS', value: 'fps'},
          {title: 'Battle Royale', value: 'battle-royale'},
          {title: 'RTS', value: 'rts'},
          {title: 'Fighting', value: 'fighting'},
        ]
      }
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
      media: 'image'
    }
  }
}
