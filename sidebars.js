module.exports = {
  mySidebar: [
    'getting-started',
    'release-notes',
    {
      type: 'category', 
      label: 'Installation',
      collapsed: false,
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
      collapsed: false,
      items: [
        'administration/configuration-file',
        'administration/manage-lsam',
      ], 
    },
    {
      type: 'category', 
      label: 'Advanced features',
      collapsed: false,
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
      items: [
        'reference/machine-messages',
        'reference/exit-codes',
        'reference/sap-bapi-errors',
      ], 
    },
  ],
};
