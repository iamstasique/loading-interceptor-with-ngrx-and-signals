import { TestBed } from '@angular/core/testing';

import { JokeRepository } from './joke.repository';

describe('JokeRepository', () => {
  let service: JokeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
