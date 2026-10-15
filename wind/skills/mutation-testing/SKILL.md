---
name: mutation-testing
description: Use when applying the Scout Rule to modified files - to run mutation testing (Stryker, Cosmic Ray, mutmut, PIT) and add tests that kill surviving mutants.
---
# Mutation Testing

Coverage says code ran; mutation score says tests would notice if it broke.

## Tools
| Ecosystem | Tool | Command |
|---|---|---|
| JavaScript / TypeScript / Angular | Stryker | `npx stryker run` |
| Python | Cosmic Ray / mutmut | `cosmic-ray exec ...` / `mutmut run` |
| Java | PIT | `mvn org.pitest:pitest-maven:mutationCoverage` |
| .NET | Stryker.NET | `dotnet stryker` |

## Steps
1. Scope the run to the files you modified (mutation runs are slow).
2. List surviving mutants.
3. For each survivor: add a test that kills it, or mark it equivalent with a reason.
4. Re-run until the modified files have no unexplained survivors.
