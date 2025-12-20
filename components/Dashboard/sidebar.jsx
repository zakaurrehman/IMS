import React from 'react';
import { FileCode, CheckCircle, AlertCircle } from 'lucide-react';

export default function SidebarComponentGuide() {
  const components = [
    {
      name: 'SidebarProvider',
      file: '@components/ui/sidebar.jsx',
      description: 'Root provider component that manages sidebar state',
      props: ['defaultOpen', 'open', 'onOpenChange', 'className', 'style'],
      required: true
    },
    {
      name: 'Sidebar',
      file: '@components/ui/sidebar.jsx',
      description: 'Main sidebar container component',
      props: ['side', 'variant', 'collapsible', 'className'],
      required: true
    },
    {
      name: 'SidebarTrigger',
      file: '@components/ui/sidebar.jsx',
      description: 'Button to toggle sidebar visibility',
      props: ['className', 'onClick'],
      required: false
    },
    {
      name: 'SidebarRail',
      file: '@components/ui/sidebar.jsx',
      description: 'Clickable rail for toggling sidebar',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarInset',
      file: '@components/ui/sidebar.jsx',
      description: 'Main content area wrapper',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarHeader',
      file: '@components/ui/sidebar.jsx',
      description: 'Header section of sidebar',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarFooter',
      file: '@components/ui/sidebar.jsx',
      description: 'Footer section of sidebar',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarContent',
      file: '@components/ui/sidebar.jsx',
      description: 'Scrollable content area',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarGroup',
      file: '@components/ui/sidebar.jsx',
      description: 'Groups related menu items',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarGroupLabel',
      file: '@components/ui/sidebar.jsx',
      description: 'Label for a sidebar group',
      props: ['className', 'asChild'],
      required: false
    },
    {
      name: 'SidebarGroupAction',
      file: '@components/ui/sidebar.jsx',
      description: 'Action button for a group',
      props: ['className', 'asChild'],
      required: false
    },
    {
      name: 'SidebarGroupContent',
      file: '@components/ui/sidebar.jsx',
      description: 'Content wrapper for group items',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenu',
      file: '@components/ui/sidebar.jsx',
      description: 'Menu list container',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenuItem',
      file: '@components/ui/sidebar.jsx',
      description: 'Individual menu item',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenuButton',
      file: '@components/ui/sidebar.jsx',
      description: 'Button within menu item',
      props: ['asChild', 'isActive', 'variant', 'size', 'tooltip', 'className'],
      required: false
    },
    {
      name: 'SidebarMenuAction',
      file: '@components/ui/sidebar.jsx',
      description: 'Action button for menu item',
      props: ['className', 'asChild', 'showOnHover'],
      required: false
    },
    {
      name: 'SidebarMenuBadge',
      file: '@components/ui/sidebar.jsx',
      description: 'Badge indicator for menu item',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenuSkeleton',
      file: '@components/ui/sidebar.jsx',
      description: 'Loading skeleton for menu items',
      props: ['className', 'showIcon'],
      required: false
    },
    {
      name: 'SidebarMenuSub',
      file: '@components/ui/sidebar.jsx',
      description: 'Submenu container',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenuSubItem',
      file: '@components/ui/sidebar.jsx',
      description: 'Individual submenu item',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarMenuSubButton',
      file: '@components/ui/sidebar.jsx',
      description: 'Button within submenu item',
      props: ['asChild', 'size', 'isActive', 'className'],
      required: false
    },
    {
      name: 'SidebarInput',
      file: '@components/ui/sidebar.jsx',
      description: 'Search/input field for sidebar',
      props: ['className'],
      required: false
    },
    {
      name: 'SidebarSeparator',
      file: '@components/ui/sidebar.jsx',
      description: 'Visual separator line',
      props: ['className'],
      required: false
    },
    {
      name: 'useSidebar',
      file: '@components/ui/sidebar.jsx',
      description: 'Hook to access sidebar context',
      props: [],
      required: false,
      isHook: true
    }
  ];

  const dependencies = [
    { name: 'Button', file: '@components/ui/button.jsx' },
    { name: 'Input', file: '@components/ui/input.jsx' },
    { name: 'Separator', file: '@components/ui/separator.jsx' },
    { name: 'Sheet (+ SheetContent, SheetHeader, etc.)', file: '@components/ui/sheet.jsx' },
    { name: 'Skeleton', file: '@components/ui/skeleton.jsx' },
    { name: 'Tooltip (+ TooltipProvider, etc.)', file: '@components/ui/tooltip.jsx' },
    { name: 'useIsMobile', file: '@hooks/use-mobile.js' },
    { name: 'cn utility', file: '@lib/utils.js' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Sidebar Component System
          </h1>
          <p className="text-slate-600">
            Complete component reference for sidebar.jsx implementation
          </p>
        </div>

        {/* File Structure */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600" />
            File Structure
          </h2>
          <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-700">
              src/<br />
              ├── components/<br />
              │   └── ui/<br />
              │       ├── <span className="text-blue-600 font-semibold">sidebar.jsx</span> ← Main file<br />
              │       ├── button.jsx<br />
              │       ├── input.jsx<br />
              │       ├── separator.jsx<br />
              │       ├── sheet.jsx<br />
              │       ├── skeleton.jsx<br />
              │       └── tooltip.jsx<br />
              ├── hooks/<br />
              │   └── use-mobile.js<br />
              └── lib/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;└── utils.js
            </div>
          </div>
        </div>

        {/* Dependencies */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Required Dependencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dependencies.map((dep, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-4">
                <div className="font-semibold text-slate-900">{dep.name}</div>
                <div className="text-sm text-slate-600 font-mono">{dep.file}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Components List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            All Exported Components ({components.length})
          </h2>
          
          <div className="space-y-4">
            {components.map((comp, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-900">
                      {comp.name}
                    </span>
                    {comp.isHook && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        Hook
                      </span>
                    )}
                    {comp.required && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Core
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-3">
                  {comp.description}
                </p>
                
                {comp.props.length > 0 && (
                  <div className="bg-slate-50 rounded p-3">
                    <div className="text-xs font-semibold text-slate-700 mb-1">Props:</div>
                    <div className="flex flex-wrap gap-2">
                      {comp.props.map((prop, i) => (
                        <span key={i} className="text-xs bg-white text-slate-700 px-2 py-1 rounded border border-slate-200 font-mono">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Basic Usage Example
          </h2>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-100">
{`import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@components/ui/sidebar"

function App() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}`}
            </pre>
          </div>
        </div>

        {/* Constants */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Configuration Constants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded p-3">
              <div className="font-mono text-sm text-slate-900 mb-1">SIDEBAR_WIDTH</div>
              <div className="text-xs text-slate-600">16rem (256px)</div>
            </div>
            <div className="bg-slate-50 rounded p-3">
              <div className="font-mono text-sm text-slate-900 mb-1">SIDEBAR_WIDTH_MOBILE</div>
              <div className="text-xs text-slate-600">18rem (288px)</div>
            </div>
            <div className="bg-slate-50 rounded p-3">
              <div className="font-mono text-sm text-slate-900 mb-1">SIDEBAR_WIDTH_ICON</div>
              <div className="text-xs text-slate-600">3rem (48px)</div>
            </div>
            <div className="bg-slate-50 rounded p-3">
              <div className="font-mono text-sm text-slate-900 mb-1">SIDEBAR_KEYBOARD_SHORTCUT</div>
              <div className="text-xs text-slate-600">Cmd/Ctrl + B</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
