'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Lets "cote" find "Côte d'Ivoire" and "turkiye" find "Türkiye".
const plain = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Themed replacement for <select>, which cannot be styled when open.
 * Works with mouse, touch and keyboard, and submits its value with the form.
 * `options` are { value, icon? } objects.
 */
export default function Dropdown({ label, name, options, placeholder, searchable, value, onChange }) {
  const [own, setOwn] = useState('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const button = useRef(null);
  const search = useRef(null);
  const list = useRef(null);
  const id = useId();

  const selected = value ?? own;
  const chosen = options.find((option) => option.value === selected);
  const visible = options.filter((option) => plain(option.value).includes(plain(query.trim())));
  const optionId = (index) => `${id}-option-${index}`;

  const show = () => {
    setQuery('');
    setActive(Math.max(0, options.findIndex((option) => option.value === selected)));
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    button.current.focus({ preventScroll: true });
  };
  const pick = (option) => {
    setOwn(option.value);
    onChange?.(option.value);
    close();
  };

  // Move the keyboard into the list when it opens.
  useEffect(() => {
    if (open) (search.current || list.current).focus({ preventScroll: true });
  }, [open]);

  // Keep the highlighted option in view without scrolling the page.
  useEffect(() => {
    const box = list.current;
    const item = box?.children[active];
    if (!item) return;
    if (item.offsetTop < box.scrollTop) box.scrollTop = item.offsetTop;
    const bottom = item.offsetTop + item.offsetHeight;
    if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight;
  }, [open, active]);

  const onKeyDown = (event) => {
    const last = visible.length - 1;
    const moves = { ArrowDown: Math.min(active + 1, last), ArrowUp: Math.max(active - 1, 0), Home: 0, End: last };

    if (event.key in moves) {
      event.preventDefault();
      setActive(moves[event.key]);
    } else if (event.key === 'Enter' || (event.key === ' ' && !searchable)) {
      event.preventDefault();
      if (visible[active]) pick(visible[active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (event.key === 'Tab') {
      close();
    } else if (!searchable && event.key.length === 1) {
      // Typing a letter jumps to the next option that starts with it.
      const order = [...visible.keys()].map((i) => (active + 1 + i) % visible.length);
      const match = order.find((i) => plain(visible[i].value).startsWith(plain(event.key)));
      if (match !== undefined) setActive(match);
    }
  };

  return (
    <div
      className={`field dropdown${open ? ' open' : ''}`}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    >
      <span id={`${id}-label`}>{label}</span>
      <div className="dd-box">
        <button
          ref={button}
          type="button"
          className="dd-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}-value`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => (open ? close() : show())}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); show(); }
          }}
        >
          <span id={`${id}-value`} className={chosen ? '' : 'dd-empty'}>
            {chosen?.icon && <i aria-hidden="true">{chosen.icon}</i>}
            {chosen ? chosen.value : placeholder}
          </span>
        </button>

        {/* Hidden field: sends the value and makes the browser require a choice. */}
        <input
          className="dd-proxy"
          name={name}
          value={selected}
          onChange={() => {}}
          onFocus={() => button.current.focus()}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          required
        />

        {open && (
          <div className="dd-panel" onKeyDown={onKeyDown}>
            {searchable && (
              <input
                ref={search}
                className="dd-search"
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-activedescendant={visible[active] ? optionId(active) : undefined}
                aria-label={`Search ${label.toLowerCase()}`}
                placeholder="Type to search…"
                autoComplete="off"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActive(0); }}
              />
            )}
            <ul
              ref={list}
              id={`${id}-list`}
              className="dd-list"
              role="listbox"
              tabIndex={-1}
              aria-labelledby={`${id}-label`}
              aria-activedescendant={!searchable && visible[active] ? optionId(active) : undefined}
            >
              {visible.map((option, index) => (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={option.value === selected}
                  className={index === active ? 'active' : ''}
                  onPointerMove={() => setActive(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(option)}
                >
                  {option.icon && <i aria-hidden="true">{option.icon}</i>}
                  {option.value}
                </li>
              ))}
            </ul>
            {!visible.length && <p className="dd-none" role="status">No match found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
