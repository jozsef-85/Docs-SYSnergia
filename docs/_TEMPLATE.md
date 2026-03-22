# Título de la guía

Breve descripción de lo que se va a configurar.

## Requisitos previos

- Sistema operativo: [Ubuntu 24.04/CentOS 9/etc.]
- Usuario con permisos sudo
- [Otros requisitos]

## Instalación

```bash
# Comandos de instalación
sudo apt update
sudo apt install nombre-paquete
```

## Configuración

### Archivo de configuración principal

Edita el archivo de configuración:

```bash
sudo nano /ruta/al/archivo.conf
```

Contenido del archivo:

```ini title="/ruta/al/archivo.conf"
# Configuración básica
opcion1 = valor1
opcion2 = valor2
```

### Reiniciar servicio

```bash
sudo systemctl restart nombre-servicio
sudo systemctl enable nombre-servicio
```

## Verificación

Verifica que el servicio esté funcionando:

```bash
sudo systemctl status nombre-servicio
```

!!! tip "Consejo"
    Recuerda hacer backup de los archivos de configuración antes de modificarlos.

!!! warning "Advertencia"
    Esta configuración puede requerir ajustes según tu entorno específico.

## Referencias

- [Documentación oficial](https://ejemplo.com)
- Tutorial relacionado: añade aquí un enlace válido cuando la guía exista.
