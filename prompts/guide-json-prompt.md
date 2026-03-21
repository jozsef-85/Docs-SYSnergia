# Prompt Maestro Para Guías

Usa este flujo cuando quieras que una IA genere una guía nueva para SYSnergia Editorial.

## Opción rápida

Genera un prompt listo desde terminal:

```bash
npm run guide:prompt -- --title "Instalación de SQL Server en Ubuntu 24.04" --os "Ubuntu 24.04" --category "Bases de Datos" --difficulty "Intermedio"
```

Ese comando imprime un prompt listo para pegar en la IA.

## Opción manual

Pide a la IA:

- responder solo con JSON válido
- seguir la estructura de `docs/guides/_template.json`
- incluir `verification`, `troubleshooting` y `sources`
- no usar `sudo`
- no inventar compatibilidad multi-OS si no está clara

## Revisión humana recomendada

Después de generar la guía:

1. Revisar comandos y versiones.
2. Añadir troubleshooting desde experiencia real.
3. Añadir o corregir fuentes oficiales.
4. Ejecutar `npm run check`.
5. Registrar la guía en `docs/guides/index.json`.
