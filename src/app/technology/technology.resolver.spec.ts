import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { technologyResolver } from './technology.resolver';

describe('technologyResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => technologyResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
