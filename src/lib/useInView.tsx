import { useEffect, useState, RefObject } from "react";

interface Options {
  rootMargin?: string;
}

export default function useInView<T extends HTMLElement>(
  ref: RefObject<T>,
  options: Options = {}
) {
  const { rootMargin = "0px" } = options;
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
//updated useInView.tsx