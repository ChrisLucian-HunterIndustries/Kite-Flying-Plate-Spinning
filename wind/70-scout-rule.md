---
title: Scout Rule
kind: checklist
default: true
summary: Leave the code better than you found it - coverage, file length, mutants.
skills: mutation-testing
---
Always leave the code better than you found it. Perform one of the following in priority order each time a prompt leads you to this area of the code.
- Evaluate Code Coverage and add more complete tests
- File length gate, reduce the file length of the files when over 500 lines by refactoring
- Mutation testing, use a analysis tool to perform mutant hunting on the modified files. For example Cosmic Ray in Python or Striker in Angular.
