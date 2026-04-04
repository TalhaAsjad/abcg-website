import * as migration_20260404_193507_add_testimonial_slider from './20260404_193507_add_testimonial_slider';

export const migrations = [
  {
    up: migration_20260404_193507_add_testimonial_slider.up,
    down: migration_20260404_193507_add_testimonial_slider.down,
    name: '20260404_193507_add_testimonial_slider'
  },
];
