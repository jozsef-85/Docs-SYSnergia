/* ═══════════════════════════════════════════════
   SYSnergia Docs — nav.js
   Lógica central de navegación por OS
═══════════════════════════════════════════════ */

/* ── CATÁLOGO DE OS ── */
const OS_LIST = [
  { id: 'ubuntu',     name: 'Ubuntu',         ver: '24.04 LTS',   em: '🐧', color: '#e95420' },
  { id: 'debian',     name: 'Debian',         ver: '12 Bookworm', em: '🌀', color: '#a80030' },
  { id: 'centos',     name: 'CentOS Stream',  ver: '9',           em: '🔴', color: '#932279' },
  { id: 'rocky',      name: 'Rocky Linux',    ver: '9.3',         em: '🪨', color: '#10b981' },
  { id: 'fedora',     name: 'Fedora',         ver: '41',          em: '🎩', color: '#3c6eb4' },
  { id: 'almalinux',  name: 'AlmaLinux',      ver: '9.3',         em: '⭐', color: '#1c4b8e' },
  { id: 'opensuse',   name: 'openSUSE Leap',  ver: '15.5',        em: '🦎', color: '#73ba25' },
  { id: 'windows',    name: 'Windows Server', ver: '2025',        em: '🪟', color: '#0078d4' },
];

/* ── SIDEBAR POR OS ──
   Cada OS tiene sus propias secciones y guías.
   href es relativo a la carpeta del OS.
   Si una guía no existe aún, href = '' (se mostrará como "próximamente")
── */
const OS_SIDEBAR = {

  ubuntu: {
    label: 'Ubuntu 24.04 LTS',
    sections: [
      {
        title: 'Instalación / Config. Inicial',
        items: [
          { num:'01', label:'Descarga de Ubuntu',          href:'download.html'         },
          { num:'02', label:'Instalación del sistema',     href:'install.html'          },
          { num:'03', label:'Configuración inicial',       href:'initial-config.html'   },
          { num:'04', label:'Actualizar el sistema',       href:'update.html'           },
          { num:'05', label:'Añadir repositorios',         href:'repositories.html'     },
        ]
      },
      {
        title: 'NTP / SSH',
        items: [
          { num:'01', label:'Servidor NTP (Chrony)',       href:'ntp.html'              },
          { num:'02', label:'SSH — Autenticación básica',  href:'ssh-password.html'     },
          { num:'03', label:'SSH — Par de claves',         href:'ssh-keygen.html'       },
          { num:'04', label:'SSH — Port Forwarding',       href:'ssh-tunnel.html'       },
          { num:'05', label:'SSH — SFTP + Chroot',         href:'ssh-sftp.html'         },
        ]
      },
      {
        title: 'Web Server',
        items: [
          { num:'01', label:'Nginx — Instalación',         href:'nginx-install.html'    },
          { num:'02', label:'Nginx — Virtual Hosts',       href:'nginx-vhost.html'      },
          { num:'03', label:'Nginx — SSL/TLS',             href:'nginx-ssl.html'        },
          { num:'04', label:'Nginx — Reverse Proxy',       href:'nginx-proxy.html'      },
          { num:'05', label:'Apache httpd',                href:'apache.html'           },
        ]
      },
      {
        title: 'Base de Datos',
        items: [
          { num:'01', label:'MariaDB 10.11',               href:'mariadb.html'          },
          { num:'02', label:'PostgreSQL 16',               href:'postgresql.html'       },
          { num:'03', label:'MySQL 8.0',                   href:'mysql.html'            },
          { num:'04', label:'Redis / Valkey',              href:'redis.html'            },
        ]
      },
      {
        title: 'Contenedores',
        items: [
          { num:'01', label:'Docker CE',                   href:'docker.html'           },
          { num:'02', label:'Docker Compose',              href:'docker-compose.html'   },
          { num:'03', label:'Kubernetes',                  href:'kubernetes.html'       },
          { num:'04', label:'Podman',                      href:'podman.html'           },
        ]
      },
      {
        title: 'Firewall / Seguridad',
        items: [
          { num:'01', label:'UFW — Básico',                href:'ufw.html'              },
          { num:'02', label:'UFW — Reglas avanzadas',      href:'ufw-advanced.html'     },
          { num:'03', label:'Fail2Ban',                    href:'fail2ban.html'         },
          { num:'04', label:'AppArmor',                    href:'apparmor.html'         },
        ]
      },
      {
        title: 'Monitorización',
        items: [
          { num:'01', label:'Prometheus + Grafana',        href:'prometheus.html'       },
          { num:'02', label:'Zabbix 7.0 LTS',              href:'zabbix.html'           },
          { num:'03', label:'Netdata',                     href:'netdata.html'          },
        ]
      },
      {
        title: 'Almacenamiento',
        items: [
          { num:'01', label:'NFS Server',                  href:'nfs.html'              },
          { num:'02', label:'Samba / SMB',                 href:'samba.html'            },
          { num:'03', label:'LVM',                         href:'lvm.html'              },
        ]
      },
      {
        title: 'Lenguajes / Desarrollo',
        items: [
          { num:'01', label:'Python 3.12',                 href:'python.html'           },
          { num:'02', label:'Node.js 22',                  href:'nodejs.html'           },
          { num:'03', label:'PHP 8.3',                     href:'php.html'              },
          { num:'04', label:'Java / OpenJDK 21',           href:'java.html'             },
        ]
      },
      {
        title: 'Otros',
        items: [
          { num:'01', label:'SSL Certificado autofirmado', href:'ssl-self.html'         },
          { num:'02', label:'Rsync — Sincronización',      href:'rsync.html'            },
          { num:'03', label:'Cron — Tareas programadas',   href:'cron.html'             },
          { num:'04', label:'Webmin',                      href:'webmin.html'           },
        ]
      },
    ]
  },

  debian: {
    label: 'Debian 12 Bookworm',
    sections: [
      {
        title: 'Instalación / Config. Inicial',
        items: [
          { num:'01', label:'Descarga de Debian',          href:'download.html'         },
          { num:'02', label:'Instalación del sistema',     href:'install.html'          },
          { num:'03', label:'Configuración inicial',       href:'initial-config.html'   },
          { num:'04', label:'Actualizar el sistema',       href:'update.html'           },
          { num:'05', label:'Añadir repositorios',         href:'repositories.html'     },
        ]
      },
      {
        title: 'NTP / SSH',
        items: [
          { num:'01', label:'Servidor NTP (Chrony)',       href:'ntp.html'              },
          { num:'02', label:'SSH — Autenticación básica',  href:'ssh-password.html'     },
          { num:'03', label:'SSH — Par de claves',         href:'ssh-keygen.html'       },
          { num:'04', label:'SSH — Port Forwarding',       href:'ssh-tunnel.html'       },
        ]
      },
      {
        title: 'Web Server',
        items: [
          { num:'01', label:'Nginx — Instalación',         href:'nginx-install.html'    },
          { num:'02', label:'Nginx — Virtual Hosts',       href:'nginx-vhost.html'      },
          { num:'03', label:'Nginx — SSL/TLS',             href:'nginx-ssl.html'        },
          { num:'04', label:'Apache httpd',                href:'apache.html'           },
        ]
      },
      {
        title: 'Base de Datos',
        items: [
          { num:'01', label:'MariaDB 10.11',               href:'mariadb.html'          },
          { num:'02', label:'PostgreSQL 16',               href:'postgresql.html'       },
          { num:'03', label:'Redis / Valkey',              href:'redis.html'            },
        ]
      },
      {
        title: 'Contenedores',
        items: [
          { num:'01', label:'Docker CE',                   href:'docker.html'           },
          { num:'02', label:'Kubernetes',                  href:'kubernetes.html'       },
        ]
      },
      {
        title: 'Firewall / Seguridad',
        items: [
          { num:'01', label:'UFW — Básico',                href:'ufw.html'              },
          { num:'02', label:'Fail2Ban',                    href:'fail2ban.html'         },
          { num:'03', label:'iptables',                    href:'iptables.html'         },
        ]
      },
      {
        title: 'Monitorización',
        items: [
          { num:'01', label:'Prometheus + Grafana',        href:'prometheus.html'       },
          { num:'02', label:'Zabbix 7.0 LTS',              href:'zabbix.html'           },
        ]
      },
      {
        title: 'Otros',
        items: [
          { num:'01', label:'SSL Certificado autofirmado', href:'ssl-self.html'         },
          { num:'02', label:'Rsync',                       href:'rsync.html'            },
          { num:'03', label:'Cron',                        href:'cron.html'             },
        ]
      },
    ]
  },

  centos: {
    label: 'CentOS Stream 9',
    sections: [
      {
        title: 'Instalación / Config. Inicial',
        items: [
          { num:'01', label:'Descarga de CentOS',          href:'download.html'         },
          { num:'02', label:'Instalación del sistema',     href:'install.html'          },
          { num:'03', label:'Configuración inicial',       href:'initial-config.html'   },
          { num:'04', label:'Firewall y SELinux',          href:'firewall-selinux.html' },
          { num:'05', label:'Repositorios adicionales',    href:'repositories.html'     },
        ]
      },
      {
        title: 'NTP / SSH',
        items: [
          { num:'01', label:'Servidor NTP (Chrony)',       href:'ntp.html'              },
          { num:'02', label:'SSH — Autenticación básica',  href:'ssh-password.html'     },
          { num:'03', label:'SSH — Par de claves',         href:'ssh-keygen.html'       },
          { num:'04', label:'SSH — Port Forwarding',       href:'ssh-tunnel.html'       },
        ]
      },
      {
        title: 'DNS / DHCP',
        items: [
          { num:'01', label:'DNS con BIND',                href:'bind.html'             },
          { num:'02', label:'DHCP Server',                 href:'dhcp.html'             },
          { num:'03', label:'Dnsmasq',                     href:'dnsmasq.html'          },
        ]
      },
      {
        title: 'Web Server',
        items: [
          { num:'01', label:'Nginx — Instalación',         href:'nginx-install.html'    },
          { num:'02', label:'Nginx — SSL/TLS',             href:'nginx-ssl.html'        },
          { num:'03', label:'Apache httpd',                href:'apache.html'           },
        ]
      },
      {
        title: 'Base de Datos',
        items: [
          { num:'01', label:'MariaDB 10.11',               href:'mariadb.html'          },
          { num:'02', label:'PostgreSQL 16',               href:'postgresql.html'       },
          { num:'03', label:'SQL Server 2022',             href:'mssql.html'            },
          { num:'04', label:'Redis / Valkey',              href:'redis.html'            },
        ]
      },
      {
        title: 'Contenedores',
        items: [
          { num:'01', label:'Podman',                      href:'podman.html'           },
          { num:'02', label:'Docker CE',                   href:'docker.html'           },
          { num:'03', label:'Kubernetes',                  href:'kubernetes.html'       },
        ]
      },
      {
        title: 'Firewall / Seguridad',
        items: [
          { num:'01', label:'Firewalld — Básico',          href:'firewalld.html'        },
          { num:'02', label:'SELinux',                     href:'selinux.html'          },
          { num:'03', label:'Fail2Ban',                    href:'fail2ban.html'         },
        ]
      },
      {
        title: 'Monitorización',
        items: [
          { num:'01', label:'Prometheus + Grafana',        href:'prometheus.html'       },
          { num:'02', label:'Zabbix 7.0 LTS',              href:'zabbix.html'           },
        ]
      },
      {
        title: 'Virtualización',
        items: [
          { num:'01', label:'KVM — Instalación',           href:'kvm.html'              },
          { num:'02', label:'KVM — Crear VM',              href:'kvm-vm.html'           },
        ]
      },
      {
        title: 'Otros',
        items: [
          { num:'01', label:'SSL Certificado autofirmado', href:'ssl-self.html'         },
          { num:'02', label:'Rsync',                       href:'rsync.html'            },
          { num:'03', label:'Cron',                        href:'cron.html'             },
          { num:'04', label:'Webmin',                      href:'webmin.html'           },
        ]
      },
    ]
  },

  rocky: {
    label: 'Rocky Linux 9.3',
    sections: [
      {
        title: 'Instalación / Config. Inicial',
        items: [
          { num:'01', label:'Descarga de Rocky Linux',     href:'download.html'         },
          { num:'02', label:'Instalación del sistema',     href:'install.html'          },
          { num:'03', label:'Configuración inicial',       href:'initial-config.html'   },
          { num:'04', label:'Firewall y SELinux',          href:'firewall-selinux.html' },
        ]
      },
      {
        title: 'NTP / SSH',
        items: [
          { num:'01', label:'Servidor NTP (Chrony)',       href:'ntp.html'              },
          { num:'02', label:'SSH — Par de claves',         href:'ssh-keygen.html'       },
        ]
      },
      {
        title: 'Web Server',
        items: [
          { num:'01', label:'Nginx — Instalación',         href:'nginx-install.html'    },
          { num:'02', label:'Nginx — SSL/TLS',             href:'nginx-ssl.html'        },
          { num:'03', label:'Apache httpd',                href:'apache.html'           },
        ]
      },
      {
        title: 'Base de Datos',
        items: [
          { num:'01', label:'MariaDB 10.11',               href:'mariadb.html'          },
          { num:'02', label:'PostgreSQL 16',               href:'postgresql.html'       },
          { num:'03', label:'SQL Server 2022',             href:'mssql.html'            },
        ]
      },
      {
        title: 'Contenedores',
        items: [
          { num:'01', label:'Podman',                      href:'podman.html'           },
          { num:'02', label:'Docker CE',                   href:'docker.html'           },
        ]
      },
      {
        title: 'Firewall / Seguridad',
        items: [
          { num:'01', label:'Firewalld',                   href:'firewalld.html'        },
          { num:'02', label:'SELinux',                     href:'selinux.html'          },
        ]
      },
      {
        title: 'Otros',
        items: [
          { num:'01', label:'SSL Certificado autofirmado', href:'ssl-self.html'         },
          { num:'02', label:'Rsync',                       href:'rsync.html'            },
        ]
      },
    ]
  },

  windows: {
    label: 'Windows Server 2025',
    sections: [
      {
        title: 'Instalación / Config. Inicial',
        items: [
          { num:'01', label:'Descargar Windows Server',    href:'download.html'         },
          { num:'02', label:'Instalación del sistema',     href:'install.html'          },
          { num:'03', label:'Configuración inicial',       href:'initial-config.html'   },
          { num:'04', label:'Windows Update',              href:'update.html'           },
        ]
      },
      {
        title: 'Remote Desktop',
        items: [
          { num:'01', label:'Habilitar RDP',               href:'rdp.html'              },
          { num:'02', label:'RDP con certificado SSL',     href:'rdp-ssl.html'          },
          { num:'03', label:'RemoteApp',                   href:'remoteapp.html'        },
        ]
      },
      {
        title: 'Active Directory',
        items: [
          { num:'01', label:'Instalar AD DS',              href:'adds.html'             },
          { num:'02', label:'Usuarios y grupos',           href:'ad-users.html'         },
          { num:'03', label:'Group Policy (GPO)',          href:'gpo.html'              },
          { num:'04', label:'Unir equipo al dominio',      href:'domain-join.html'      },
        ]
      },
      {
        title: 'DNS Server',
        items: [
          { num:'01', label:'Instalar DNS Server',         href:'dns.html'              },
          { num:'02', label:'Zonas y registros',           href:'dns-zones.html'        },
        ]
      },
      {
        title: 'DHCP Server',
        items: [
          { num:'01', label:'Instalar DHCP Server',        href:'dhcp.html'             },
          { num:'02', label:'Ámbitos y opciones',          href:'dhcp-scopes.html'      },
        ]
      },
      {
        title: 'File Server',
        items: [
          { num:'01', label:'Compartir carpetas (SMB)',    href:'smb.html'              },
          { num:'02', label:'DFS — Distributed File Sys', href:'dfs.html'              },
          { num:'03', label:'Cuotas de disco',             href:'quota.html'            },
        ]
      },
      {
        title: 'IIS Web Server',
        items: [
          { num:'01', label:'Instalar IIS',                href:'iis.html'              },
          { num:'02', label:'Sitios virtuales',            href:'iis-sites.html'        },
          { num:'03', label:'SSL en IIS',                  href:'iis-ssl.html'          },
        ]
      },
      {
        title: 'Hyper-V',
        items: [
          { num:'01', label:'Instalar Hyper-V',            href:'hyperv.html'           },
          { num:'02', label:'Crear máquina virtual',       href:'hyperv-vm.html'        },
        ]
      },
      {
        title: 'PowerShell',
        items: [
          { num:'01', label:'PowerShell — Básico',         href:'powershell.html'       },
          { num:'02', label:'Scripts y automatización',    href:'ps-scripts.html'       },
          { num:'03', label:'PowerShell Remoting',         href:'ps-remoting.html'      },
        ]
      },
      {
        title: 'Failover Cluster',
        items: [
          { num:'01', label:'Instalar Failover Clustering', href:'failover.html'        },
          { num:'02', label:'Configurar clúster',           href:'failover-config.html' },
        ]
      },
      {
        title: 'Otros',
        items: [
          { num:'01', label:'Backup con Windows Server',   href:'backup.html'           },
          { num:'02', label:'WSL2 — Linux en Windows',     href:'wsl2.html'             },
          { num:'03', label:'Windows Admin Center',        href:'wac.html'              },
        ]
      },
    ]
  },

};

/* ══════════════════════════════════════════════
   RENDER FUNCTIONS
══════════════════════════════════════════════ */

/* Detectar OS activo desde la URL */
function detectOS() {
  const path = window.location.pathname;
  for (const os of OS_LIST) {
    if (path.includes('/' + os.id + '/')) return os.id;
  }
  return null; // estamos en index.html
}

/* Calcular la ruta relativa hacia la raíz */
function rootPath() {
  return detectOS() ? '../' : './';
}

/* ── Render masthead ── */
function renderMasthead() {
  const root  = rootPath();
  const osId  = detectOS();
  const osObj = OS_LIST.find(o => o.id === osId);

  const osDropItems = OS_LIST.map(o => `
    <a class="dd-item ${o.id===osId?'active':''}" href="${root}${o.id}/">
      <span>${o.em}</span> ${o.name} <span class="dd-ver">${o.ver}</span>
    </a>`).join('');

  document.getElementById('masthead').innerHTML = `
    <a class="m-logo" href="${root}index.html">
      <span class="m-logo-name">SYSnergia</span>
      <span class="m-logo-dot">·</span>
      <span class="m-logo-docs">Docs</span>
    </a>

    <nav class="m-nav">
      <div class="m-dropdown">
        <button class="m-navbtn ${osId?'active':''}">
          Otros OS &nbsp;<span style="font-size:0.6rem">▼</span>
        </button>
        <div class="dd-menu">${osDropItems}</div>
      </div>
      <a class="m-navbtn" href="${root}index.html">Inicio</a>
      <a class="m-navbtn" href="${root}about.html">Acerca de</a>
    </nav>

    <div class="m-right">
      ${osObj ? `<span class="m-os-badge" style="background:${osObj.color}22;border-color:${osObj.color};color:${osObj.color}">${osObj.em} ${osObj.name} ${osObj.ver}</span>` : ''}
      <div class="m-search-wrap">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input class="m-search-inp" type="text" placeholder="Buscar…"
          onkeydown="if(event.key==='Enter')doSearch(this.value)">
      </div>
    </div>`;

  /* dropdown toggle */
  const btn = document.querySelector('.m-dropdown > button');
  const menu = document.querySelector('.dd-menu');
  if (btn && menu) {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
  }
}

/* ── Render sidebar ── */
function renderSidebar(activeHref) {
  const osId = detectOS();
  const root = rootPath();
  const sb   = document.getElementById('sidebar');
  if (!sb) return;

  if (!osId || !OS_SIDEBAR[osId]) {
    sb.innerHTML = '<div class="sb-home-msg">Selecciona un sistema operativo</div>';
    return;
  }

  const data = OS_SIDEBAR[osId];

  const sections = data.sections.map((sec, i) => {
    const hasActive = sec.items.some(it => it.href === activeHref);
    const isOpen    = i === 0 || hasActive;

    const items = sec.items.map(it => {
      const exists  = it.href !== '';
      const isCurr  = it.href === activeHref;
      const href    = exists ? it.href : '#';
      const cls     = ['sb-item', isCurr?'active':'', !exists?'soon':''].filter(Boolean).join(' ');
      return `
        <a class="${cls}" href="${href}" ${!exists?'tabindex="-1"':''}>
          <span class="sb-n">${it.num}</span>
          <span>${it.label}</span>
          ${!exists ? '<span class="sb-soon">pronto</span>' : ''}
        </a>`;
    }).join('');

    return `
      <div class="sb-section">
        <div class="sb-hd ${isOpen?'open':''}" onclick="toggleSB(this)">
          <span>${sec.title}</span><span class="arr">▶</span>
        </div>
        <div class="sb-items ${isOpen?'open':''}">${items}</div>
      </div>`;
  }).join('');

  sb.innerHTML = `
    <div class="sb-os-title">${data.label}</div>
    ${sections}
    <div class="sb-footer">SYSnergia Docs</div>`;
}

/* ── Sidebar toggle ── */
function toggleSB(hd) {
  hd.classList.toggle('open');
  hd.nextElementSibling.classList.toggle('open');
}

/* ── Copy code ── */
function copyCode(btn) {
  const pre = btn.closest('.cb').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = '✓ Copiado'; btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('ok'); }, 2000);
  });
}

/* ── Toggle step ── */
function toggleStep(hd) {
  const body  = hd.nextElementSibling;
  const arrow = hd.querySelector('.step-arrow');
  const open  = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.classList.toggle('open', !open);
}

/* ── Search ── */
function doSearch(q) {
  if (!q.trim()) return;
  const osId = detectOS();
  const lq   = q.toLowerCase();
  if (osId && OS_SIDEBAR[osId]) {
    for (const sec of OS_SIDEBAR[osId].sections)
      for (const it of sec.items)
        if (it.label.toLowerCase().includes(lq) && it.href)
          { window.location.href = it.href; return; }
  }
  alert('No se encontraron resultados para: ' + q);
}
