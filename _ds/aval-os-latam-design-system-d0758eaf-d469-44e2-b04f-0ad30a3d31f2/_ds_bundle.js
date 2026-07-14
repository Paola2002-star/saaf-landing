/* @ds-bundle: {"format":4,"namespace":"AvalOsLATAMDesignSystem_d0758e","components":[],"sourceHashes":{"ui_kits/catalog/CatalogTable.jsx":"484f25b07154","ui_kits/catalog/FamilyControl.jsx":"c2cab76d3a97","ui_kits/catalog/Modals.jsx":"c28ffceff692","ui_kits/catalog/data.js":"59d5ab3a9650"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AvalOsLATAMDesignSystem_d0758e = window.AvalOsLATAMDesignSystem_d0758e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/catalog/CatalogTable.jsx
try { (() => {
/* global React */

function Menu({
  options,
  label = "Opciones"
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "menu",
    ref: ref
  }, /*#__PURE__*/React.createElement("button", {
    className: "menu__trigger",
    onClick: () => setOpen(o => !o)
  }, label, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    className: "menu__list"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    className: `menu__item ${o.tone ? `menu__item--${o.tone}` : ""}`,
    onClick: () => {
      o.onClick();
      setOpen(false);
    }
  }, o.label))));
}
function Pagination({
  page,
  totalPages,
  onChange
}) {
  const pages = Array.from({
    length: Math.min(totalPages, 7)
  }, (_, i) => i + 1);
  return /*#__PURE__*/React.createElement("nav", {
    className: "pagination"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: page === 1,
    onClick: () => onChange(page - 1),
    className: "pagination__btn pagination__btn--edge"
  }, "\u2039"), pages.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => onChange(p),
    className: `pagination__btn ${page === p ? "pagination__btn--active" : ""}`
  }, p)), /*#__PURE__*/React.createElement("button", {
    disabled: page === totalPages,
    onClick: () => onChange(page + 1),
    className: "pagination__btn pagination__btn--edge"
  }, "\u203A"));
}
function CatalogTable({
  items,
  configs,
  excludedIds,
  search,
  onSearch,
  onNew,
  onView,
  onEdit,
  onDelete,
  onToggleExclude
}) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const isFamilyEnabled = fam => {
    const cfg = configs.find(c => c.familyName === fam);
    return cfg ? cfg.enabled : true;
  };
  const filtered = items.filter(i => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return [i.name, i.family, i.group, i.assetType, i.conservationStatus, i.createdBy].some(v => (v || "").toLowerCase().includes(q));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const safe = Math.min(page, totalPages);
  const paged = filtered.slice((safe - 1) * limit, safe * limit);
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__head card__head--split"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "card__title"
  }, "\xCDtems del cat\xE1logo"), /*#__PURE__*/React.createElement("p", {
    className: "card__desc"
  }, "Entradas reutilizables que los usuarios pueden cargar al capturar un activo.")), /*#__PURE__*/React.createElement("div", {
    className: "card__actions"
  }, /*#__PURE__*/React.createElement("input", {
    className: "input input--search",
    value: search,
    onChange: e => {
      onSearch(e.target.value);
      setPage(1);
    },
    placeholder: "Buscar por nombre, familia, tipo, estado, creador\u2026"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--success",
    disabled: true,
    title: "Pr\xF3ximamente disponible"
  }, "Exportar a Excel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: onNew
  }, "+ Nueva entrada"))), /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["#", "Nombre", "Familia / Grupo", "Tipo", "Estado conserv.", "Creado por", "Creado", "Acciones"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, paged.map((item, idx) => {
    const famOn = isFamilyEnabled(item.family);
    const excluded = excludedIds.has(item.id);
    const available = famOn && !excluded;
    const rowCls = !famOn ? "row--family-off" : excluded ? "row--excluded" : "";
    return /*#__PURE__*/React.createElement("tr", {
      key: item.id,
      className: rowCls
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "row-num"
    }, /*#__PURE__*/React.createElement("span", {
      className: `dot ${available ? "dot--on" : "dot--off"}`
    }), (safe - 1) * limit + idx + 1)), /*#__PURE__*/React.createElement("td", {
      className: "cell-name"
    }, /*#__PURE__*/React.createElement("div", {
      className: "truncate"
    }, item.name), excluded && /*#__PURE__*/React.createElement("span", {
      className: "micro-tag micro-tag--warn"
    }, "Excluido"), !famOn && /*#__PURE__*/React.createElement("span", {
      className: "micro-tag"
    }, "Familia desact.")), /*#__PURE__*/React.createElement("td", {
      className: "text-muted truncate"
    }, [item.family, item.group].filter(Boolean).join(" › ") || "—"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${item.assetType === "industrial" ? "badge--industrial" : "badge--mobiliario"}`
    }, item.assetType === "industrial" ? "Industrial" : "Mobiliario")), /*#__PURE__*/React.createElement("td", {
      className: "text-muted"
    }, item.conservationStatus), /*#__PURE__*/React.createElement("td", {
      className: "text-muted"
    }, item.createdBy), /*#__PURE__*/React.createElement("td", {
      className: "text-muted"
    }, new Date(item.createdAt).toLocaleDateString("es-MX")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Menu, {
      options: [{
        id: "view",
        label: "Ver",
        onClick: () => onView(item)
      }, {
        id: "edit",
        label: "Actualizar",
        onClick: () => onEdit(item)
      }, ...(famOn ? [{
        id: "exc",
        label: excluded ? "Incluir ítem" : "Excluir ítem",
        onClick: () => onToggleExclude(item),
        tone: excluded ? "success" : "warning"
      }] : []), {
        id: "del",
        label: "Eliminar",
        onClick: () => onDelete(item),
        tone: "danger"
      }]
    })));
  }), paged.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "8",
    className: "empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty__glyph"
  }, "\uD83D\uDCED"), /*#__PURE__*/React.createElement("div", {
    className: "empty__text"
  }, search.trim() ? "Sin resultados para esa búsqueda." : "El catálogo está vacío.")))))), /*#__PURE__*/React.createElement("div", {
    className: "table-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-foot__left"
  }, /*#__PURE__*/React.createElement("span", null, "Mostrando"), /*#__PURE__*/React.createElement("select", {
    value: limit,
    onChange: e => {
      setLimit(Number(e.target.value));
      setPage(1);
    },
    className: "select select--inline"
  }, [10, 20, 50].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n))), /*#__PURE__*/React.createElement("span", null, "de ", /*#__PURE__*/React.createElement("strong", null, filtered.length), " resultados")), /*#__PURE__*/React.createElement(Pagination, {
    page: safe,
    totalPages: totalPages,
    onChange: setPage
  }))));
}
window.Menu = Menu;
window.CatalogTable = CatalogTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalog/CatalogTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalog/FamilyControl.jsx
try { (() => {
/* global React */

function Toggle({
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onChange();
    },
    className: `toggle ${checked ? "toggle--on" : "toggle--off"}`,
    "aria-pressed": checked
  }, /*#__PURE__*/React.createElement("span", {
    className: "toggle__knob"
  }));
}
function FamilyControl({
  families,
  configs,
  onToggle
}) {
  const isEnabled = name => {
    const cfg = configs.find(c => c.familyName === name);
    return cfg ? cfg.enabled : true;
  };
  const enabledCount = families.filter(f => isEnabled(f.value)).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "card__title"
  }, "Control de familias"), /*#__PURE__*/React.createElement("p", {
    className: "card__desc"
  }, "Define qu\xE9 familias est\xE1n disponibles para los auxiliares \xB7 ", /*#__PURE__*/React.createElement("b", null, enabledCount), " de ", families.length, " habilitadas"))), /*#__PURE__*/React.createElement("div", {
    className: "card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "family-grid"
  }, families.map(family => {
    const enabled = isEnabled(family.value);
    const count = Math.floor(Math.random() * 20) + 1;
    return /*#__PURE__*/React.createElement("div", {
      key: family.value,
      className: `family-tile ${enabled ? "family-tile--on" : "family-tile--off"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "family-tile__text"
    }, /*#__PURE__*/React.createElement("p", {
      className: "family-tile__title"
    }, family.value), /*#__PURE__*/React.createElement("p", {
      className: "family-tile__meta"
    }, count, " ", count === 1 ? "ítem" : "ítems", !enabled && /*#__PURE__*/React.createElement("span", {
      className: "family-tile__tag"
    }, "Deshabilitada"))), /*#__PURE__*/React.createElement(Toggle, {
      checked: enabled,
      onChange: () => onToggle(family.value)
    }));
  }))));
}
window.Toggle = Toggle;
window.FamilyControl = FamilyControl;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalog/FamilyControl.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalog/Modals.jsx
try { (() => {
/* global React */

function Modal({
  title,
  onClose,
  children,
  footer,
  size = "lg"
}) {
  React.useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: `modal modal--${size}`,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal__title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "modal__close",
    onClick: onClose,
    "aria-label": "Cerrar"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "modal__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "modal__foot"
  }, footer)));
}
function ConfirmDelete({
  onCancel,
  onConfirm,
  busy
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "scrim",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal modal--sm",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__body",
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal__title"
  }, "\xBFEliminar esta entrada del cat\xE1logo?"), /*#__PURE__*/React.createElement("p", {
    className: "hint",
    style: {
      marginTop: 8
    }
  }, "Esta acci\xF3n no se puede deshacer."), /*#__PURE__*/React.createElement("div", {
    className: "btn-row",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--secondary",
    onClick: onCancel,
    disabled: busy
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: onConfirm,
    disabled: busy
  }, busy ? "Eliminando…" : "Eliminar")))));
}
function ItemForm({
  value,
  onChange,
  exact,
  similar,
  families
}) {
  const groups = families.find(f => f.value === value.family)?.groups ?? [];
  const inputState = exact.length ? "err" : similar.length ? "warn" : "";
  return /*#__PURE__*/React.createElement("div", {
    className: "form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Nombre / Descripci\xF3n ", /*#__PURE__*/React.createElement("span", {
    className: "required"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: `input input--${inputState}`,
    value: value.name,
    onChange: e => onChange({
      ...value,
      name: e.target.value
    }),
    placeholder: "Ej. Silla ejecutiva con respaldo alto"
  }), exact.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "banner banner--danger"
  }, /*#__PURE__*/React.createElement("p", {
    className: "banner__title"
  }, "\u2715 Ya existe una entrada con ese nombre exacto:"), exact.map(d => /*#__PURE__*/React.createElement("p", {
    key: d.id,
    className: "banner__item"
  }, "\xB7 ", d.name)), /*#__PURE__*/React.createElement("p", {
    className: "banner__hint"
  }, "Cambia el nombre para poder guardar.")), exact.length === 0 && similar.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "banner banner--warning"
  }, /*#__PURE__*/React.createElement("p", {
    className: "banner__title"
  }, "\u26A0 Nombre similar a ", similar.length, " entrada", similar.length > 1 ? "s" : "", " existente", similar.length > 1 ? "s" : "", ":"), similar.map(d => /*#__PURE__*/React.createElement("p", {
    key: d.id,
    className: "banner__item"
  }, "\xB7 ", d.name)), /*#__PURE__*/React.createElement("p", {
    className: "banner__hint"
  }, "Si es una variante distinta, puedes guardar de todas formas."))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Marca"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: value.brand,
    onChange: e => onChange({
      ...value,
      brand: e.target.value
    }),
    placeholder: "Ej. Herman Miller"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Modelo"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: value.model,
    onChange: e => onChange({
      ...value,
      model: e.target.value
    }),
    placeholder: "Ej. Aeron"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Familia"), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: value.family,
    onChange: e => onChange({
      ...value,
      family: e.target.value,
      group: ""
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Familia \u2014"), families.map(f => /*#__PURE__*/React.createElement("option", {
    key: f.value,
    value: f.value
  }, f.value)))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Grupo"), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: value.group,
    disabled: !value.family,
    onChange: e => onChange({
      ...value,
      group: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Grupo \u2014"), groups.map(g => /*#__PURE__*/React.createElement("option", {
    key: g,
    value: g
  }, g))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Tipo de activo"), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: value.assetType,
    onChange: e => onChange({
      ...value,
      assetType: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "industrial"
  }, "Industrial"), /*#__PURE__*/React.createElement("option", {
    value: "mobiliario"
  }, "Mobiliario"))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Estado de conservaci\xF3n"), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: value.conservationStatus,
    onChange: e => onChange({
      ...value,
      conservationStatus: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "Bueno"
  }, "Bueno"), /*#__PURE__*/React.createElement("option", {
    value: "Regular"
  }, "Regular"), /*#__PURE__*/React.createElement("option", {
    value: "Malo"
  }, "Malo")))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Observaciones"), /*#__PURE__*/React.createElement("textarea", {
    className: "textarea",
    rows: "3",
    value: value.observations,
    onChange: e => onChange({
      ...value,
      observations: e.target.value
    }),
    placeholder: "Caracter\xEDsticas adicionales\u2026"
  })));
}
function DetailView({
  item
}) {
  const rows = [["Nombre", item.name], ["Familia", item.family], ["Grupo", item.group], ["Marca", item.brand || "—"], ["Modelo", item.model || "—"], ["Tipo", item.assetType === "industrial" ? "Industrial" : "Mobiliario"], ["Estado conserv.", item.conservationStatus], ["Observaciones", item.observations || "—"], ["Creado por", item.createdBy], ["Creado", new Date(item.createdAt).toLocaleString("es-MX")]];
  return /*#__PURE__*/React.createElement("div", {
    className: "detail"
  }, rows.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    className: "detail__row",
    key: k
  }, /*#__PURE__*/React.createElement("span", {
    className: "detail__key"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "detail__val"
  }, v))));
}
window.Modal = Modal;
window.ConfirmDelete = ConfirmDelete;
window.ItemForm = ItemForm;
window.DetailView = DetailView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalog/Modals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/catalog/data.js
try { (() => {
/* global window */

const ASSET_FAMILIES = [{
  value: "Mobiliario y equipo de oficina",
  groups: ["Sillas", "Escritorios", "Mesas de juntas", "Archiveros", "Libreros", "Lockers", "Sofás y sillones", "Persianas y cortinas"]
}, {
  value: "TI y Cómputo",
  groups: ["Laptops", "Computadoras de escritorio", "Monitores", "Impresoras", "Servidores", "Periféricos", "Tabletas", "Teléfonos IP", "Escáneres", "UPS y reguladores"]
}, {
  value: "Maquinaria y equipo",
  groups: ["Montacargas", "Tornos", "Compresores", "Prensas", "Bandas transportadoras", "Generadores", "Soldadoras", "Herramienta mayor"]
}, {
  value: "Equipo de transporte",
  groups: ["Vehículos ligeros", "Camiones", "Motocicletas", "Carretillas", "Tractores"]
}, {
  value: "Inmuebles e instalaciones",
  groups: ["Edificios", "Instalaciones eléctricas", "Instalaciones hidráulicas", "Instalaciones de aire acond.", "Obras en proceso"]
}, {
  value: "Equipo médico",
  groups: ["Equipos de diagnóstico", "Equipos de laboratorio", "Equipos de rehabilitación", "Instrumental quirúrgico"]
}, {
  value: "Bienes menores",
  groups: ["Herramienta menor", "Utensilios", "Accesorios de ofic."]
}, {
  value: "Equipo de comunicación",
  groups: ["Conmutadores", "Radios", "Cámaras de seguridad", "Antenas y repetidores", "Equipos de videoconf."]
}, {
  value: "Intangibles y Software",
  groups: ["Licencias de software", "Patentes", "Marcas registradas", "Derechos de uso"]
}];
const SAMPLE_ITEMS = [{
  id: "1",
  name: "Laptop Dell Latitude 5430",
  brand: "Dell",
  model: "Latitude 5430",
  family: "TI y Cómputo",
  group: "Laptops",
  assetType: "industrial",
  conservationStatus: "Bueno",
  createdBy: "M. Rodríguez",
  createdAt: "2025-09-14",
  observations: ""
}, {
  id: "2",
  name: "Silla ejecutiva con respaldo alto",
  brand: "Herman Miller",
  model: "Aeron",
  family: "Mobiliario y equipo de oficina",
  group: "Sillas",
  assetType: "mobiliario",
  conservationStatus: "Bueno",
  createdBy: "A. Vázquez",
  createdAt: "2025-08-02",
  observations: ""
}, {
  id: "3",
  name: "Montacargas eléctrico 2 ton",
  brand: "Toyota",
  model: "8FBE20",
  family: "Maquinaria y equipo",
  group: "Montacargas",
  assetType: "industrial",
  conservationStatus: "Regular",
  createdBy: "J. Pérez",
  createdAt: "2025-07-22",
  observations: ""
}, {
  id: "4",
  name: "Monitor curvo 27\"",
  brand: "LG",
  model: "27UL850",
  family: "TI y Cómputo",
  group: "Monitores",
  assetType: "industrial",
  conservationStatus: "Bueno",
  createdBy: "M. Rodríguez",
  createdAt: "2025-10-01",
  observations: ""
}, {
  id: "5",
  name: "Escritorio ejecutivo en L",
  brand: "Steelcase",
  model: "Series 5",
  family: "Mobiliario y equipo de oficina",
  group: "Escritorios",
  assetType: "mobiliario",
  conservationStatus: "Bueno",
  createdBy: "A. Vázquez",
  createdAt: "2025-06-11",
  observations: ""
}, {
  id: "6",
  name: "Camión de carga 3.5 ton",
  brand: "Isuzu",
  model: "ELF 500",
  family: "Equipo de transporte",
  group: "Camiones",
  assetType: "industrial",
  conservationStatus: "Regular",
  createdBy: "J. Pérez",
  createdAt: "2025-05-30",
  observations: ""
}, {
  id: "7",
  name: "Equipo de ultrasonido portátil",
  brand: "GE Healthcare",
  model: "Vscan Air",
  family: "Equipo médico",
  group: "Equipos de diagnóstico",
  assetType: "industrial",
  conservationStatus: "Bueno",
  createdBy: "L. Morales",
  createdAt: "2025-04-18",
  observations: ""
}, {
  id: "8",
  name: "Archivero metálico 4 gavetas",
  brand: "Hon",
  model: "510 Series",
  family: "Mobiliario y equipo de oficina",
  group: "Archiveros",
  assetType: "mobiliario",
  conservationStatus: "Malo",
  createdBy: "A. Vázquez",
  createdAt: "2025-03-09",
  observations: ""
}, {
  id: "9",
  name: "Licencia Microsoft 365 E3",
  brand: "Microsoft",
  model: "E3",
  family: "Intangibles y Software",
  group: "Licencias de software",
  assetType: "industrial",
  conservationStatus: "Bueno",
  createdBy: "M. Rodríguez",
  createdAt: "2025-02-14",
  observations: ""
}, {
  id: "10",
  name: "Cámara de seguridad IP PTZ",
  brand: "Hikvision",
  model: "DS-2DE4A425",
  family: "Equipo de comunicación",
  group: "Cámaras de seguridad",
  assetType: "industrial",
  conservationStatus: "Bueno",
  createdBy: "J. Pérez",
  createdAt: "2025-01-22",
  observations: ""
}];
window.ASSET_FAMILIES = ASSET_FAMILIES;
window.SAMPLE_ITEMS = SAMPLE_ITEMS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/catalog/data.js", error: String((e && e.message) || e) }); }

})();
