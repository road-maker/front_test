import { NewRoadmap } from '../../components/editor/types';

const ROADMAP_LOCALSTORAGE_KEY = 'roadmaps';

// export function getStoredRoadmap(roadmap: NewRoadmap): NewRoadmap | null {
export function getStoredRoadmap(): NewRoadmap | null {
  const storedRoadmap = localStorage.getItem(ROADMAP_LOCALSTORAGE_KEY);
  return storedRoadmap ? JSON.parse(storedRoadmap) : null;
}

export function setStoredRoadmap(roadmap: NewRoadmap): void {
  // const roadmaps: Array<Roadmap | null> = [];
  // roadmaps.push(getStoredRoadmap(id));
  localStorage.setItem(ROADMAP_LOCALSTORAGE_KEY, JSON.stringify(roadmap));
}

export function clearStoredRoadmap(): void {
  localStorage.removeItem(ROADMAP_LOCALSTORAGE_KEY);
}
