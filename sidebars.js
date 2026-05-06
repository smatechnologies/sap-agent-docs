module.exports = {
  mySidebar: [
    'overview',
    'release-notes',
    {
      type: 'category',
      label: 'Installation',
      collapsed: true,
      link: { type: 'doc', id: 'installation/installation-overview' },
      items: [
        'installation/prerequisites',
        'installation/determine-installation-media',
        'installation/new-installation',
        'installation/upgrade-installation',
        'installation/silent-mode',
        'installation/multiple-instances',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      collapsed: true,
      link: { type: 'doc', id: 'administration/administration-overview' },
      items: [
        'administration/configuration-file',
        'administration/manage-lsam',
      ],
    },
    {
      type: 'category',
      label: 'Advanced features',
      collapsed: true,
      link: { type: 'doc', id: 'advanced-features/advanced-features-overview' },
      items: [
        'advanced-features/jors',
        'advanced-features/logging',
        'advanced-features/kill-command',
        'advanced-features/msgin',
        'advanced-features/external-jobs',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      link: { type: 'doc', id: 'reference/reference-overview' },
      items: [
        'reference/machine-messages',
        'reference/exit-codes',
        'reference/sap-bapi-errors',
      ],
    },
  ],
};
