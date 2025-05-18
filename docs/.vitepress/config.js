export default {
    title: 'HR Project Docs',
    description: 'Документация по проекту управления кадрами',
    themeConfig: {
        nav: [
            { text: 'Руководство', link: '/guide/' },
            { text: 'GitHub', link: 'https://github.com/oshihihiteo/areal-hr_ext-test' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Руководство',
                    items: [
                        { text: 'Начало работы', link: '/guide/getting-started' },
                        { text: 'Backend', link: '/guide/backend' },
                        { text: 'Frontend', link: '/guide/frontend' },
                        { text: 'Роли', link: '/guide/roles' },
                    ]
                }
            ]
        }
    }
}
