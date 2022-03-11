import './hover-cover.scss';

const findParents = (el: HTMLElement, foundParents: HTMLElement[] = []): HTMLElement[] => {
  const parent = el.parentElement as HTMLElement|null;
  if (!parent) {
    return foundParents;
  }

  if (parent.classList.contains('sb-hover-cover')) {
    return findParents(
      parent,
      [
        ...foundParents,
        parent,
      ],
    );
  }

  return findParents(
    parent,
    foundParents,
  );
}

const parentData = new WeakMap();

const onMouseEnter = (event: MouseEvent) => {
  const parents = parentData.get(event.target as HTMLElement);
  for (const parent of parents) {
    parent.classList.add('sb-hover-cover_child-hovered');
  }
};

const onMouseLeave = (event: MouseEvent) => {
  const parents = parentData.get(event.target as HTMLElement);
  if (parents && parents.length) {
    parents[0].classList.remove('sb-hover-cover_child-hovered');
  }
};

export default {
  updated(el: HTMLElement) {
    el.classList.add('sb-hover-cover');
  },

  beforeMount(el: HTMLElement) {
    el.classList.add('sb-hover-cover');
  },

  mounted(el: HTMLElement) {
    el.classList.add('sb-hover-cover');

    const parents = findParents(el);
    parentData.set(el, parents);

    console.log('got parents', el, parents);

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
  },

  unmounted(el:HTMLElement) {
    el.removeEventListener('mouseenter', onMouseEnter)
    el.removeEventListener('mouseleave', onMouseLeave)
  },
};
