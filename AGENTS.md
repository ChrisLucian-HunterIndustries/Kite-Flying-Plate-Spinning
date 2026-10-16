# Agent Instructions
Minimize necessary reading, always talk to me using Information Dense prioritized information.
Favor YAGNI.
Favor LEAN and Elimination of LEAN deadly wastes.
Always create the below checklist for every prompt:

## Checklist Manifesto
Always use your checklist or todo list tool to track items. Do not leave it to chance that you will remember later.
Immediately before implementing any prompts set up the following tasks as a checklist.
- Prod Check
- Preparatory Unit Test Coverage
- Prepare a list of code smells to reference in the next step
- Make it easy to change (which may be hard) (refactoring)
- Make the easy change
- Security Review
- Small Safe Commits
- Scout Rule
- Extract Determinism
- Single Loop Learning
- Double Loop Learning
- Canary

## Prod Check
When applicable, evaluate the existing health of the production system.

## Preparatory Unit Test Coverage
Ensure the area that will be changed has approrpriate characterization tests making it safe to refactor.
Ensure characterization tests pass before starting any refactoring. 
When fixing a reported bug, first write a test that reproduces it and watch it fail.

## Make it easy to change (which may be hard)
Refactor to common computer science grounded design patterns.
The resulting code should be easy to read, limited in file length, appropriately decoupled, and cohesive.

## Make the easy change
Complete the prompt considering YAGNI and DRY concepts in software development. 
Prefer the project's existing toolchain over adding a new language or tool; check whether it already does the job first.
For UI changes, verify in a real browser by asserting on DOM state and downloaded output, not only screenshots.

## Security Review
Evaluate for common OWASP pitfalls using the current OWASP Top 10 lists that fit the system (Web, Agentic, IoT).
Run automated audits like pip audit, npm audit and correct package issues.
Evaluate for harder to detect problems with the system such as IDOR vulnerabilities.

## Small Safe Commits
Commit in small, safe, reversible steps. Keep refactorings and behavior changes in separate commits.
Run the tests before every commit and state the risk of each commit in its message.
Always commit all work at the end of every prompt using the racn MCP server (Risk-Aware Commit Notation), sliced so every commit stays green.

## Scout Rule
Always leave the code better than you found it. Perform one of the following in priority order each time a prompt leads you to this area of the code.
- Evaluate Code Coverage and add more complete tests
- File length gate, reduce the file length of the files when over 500 lines by refactoring
- Mutation testing, use a analysis tool to perform mutant hunting on the modified files. For example Cosmic Ray in Python or Striker in Angular.

## Extract Determinism
Anything repetitive, rule-based, or that must be exact should not be re-reasoned by the LLM each time.
- Recommend existing deterministic tools (formatters, linters, CLIs, MCP servers) that already do the job.
- Otherwise build one: a script, test, or MCP server, then use it instead of the LLM from then on.
- Keep the LLM for judgment; give it deterministic tools for everything else.

## Single Loop Learning
Learn from the tasks you complete:
Always end all of our chats with a list of skills that you used.
Always create new skills in your skills folder that you wish you had before starting the prompt. Actually write the file now.
Always end all of our chats with a list of MCP servers that you used.
Always create new MCP servers that you wish you had before starting the prompt. Actually write the server now.

## Double Loop Learning
Learn from the process improvement opportunities:
Always evaluate the the process used here using a lens of Lean Software Development, Agile, Systems Thinking, Safety, Security, and Continuous Improvement. 
Always make the changes to the AGENTS.md with these changes. Update this very list you are reading now.
When AGENTS.md is generated from wind/*.md files, make the same change in the matching wind file so they never drift.

## Canary
Always end all of our chats with "# 🪁" Emoji. It should render as a markdown header so the Emoji will be large.
