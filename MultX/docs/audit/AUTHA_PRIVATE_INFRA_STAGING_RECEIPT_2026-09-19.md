# Autha private-infrastructure staging evidence receipt

Date received and independently checked: 2026-09-20.

## Supplied evidence identities

- Evidence package: `MULTX_PRIVATE_INFRA_RESULTS_MXDSV-20260919T092949Z.zip`
- Artifact reference: `MXDSV-20260919T092949Z`
- Evidence package SHA-256:
  `33ae9b873b478627fe3aa3b2bfc5347d4e549ee5c31215f11940a8359661dca7`
- Autha report (Markdown) SHA-256:
  `74b47debd11d372013beb60bc92e19a38434c384cd0ca127a8cf70a896e4a264`
- Autha report (DOCX) SHA-256:
  `3272898635a300b30bccb8eb416533f807b33ad6324942632f062a59c6f0bd3a`
- Declared Autha issue date: 2026-09-19
- Declared review classification: operational staging evidence review against Autha O-01

The source reports and infrastructure package remain external controlled evidence and are not committed to the
public repository. This receipt records their identities, verified bindings, exact disposition, and remaining gates
without reproducing private infrastructure evidence.

## Local binding checks

- The retained evidence ZIP hashes to the exact package digest stated by the Autha report.
- All six entries in `PACKAGE_SHA256SUMS.txt` recompute successfully; zero are missing or mismatched.
- Both entries in the nested `SHA256SUMS` recompute successfully after applying the package's documented flattened
  path layout; zero are missing or mismatched.
- A bounded scan of the extracted package found no private-key blocks, mnemonic/seed phrases, password assignments,
  bearer tokens, or AWS access-key identifiers.
- The package reports a dedicated `multx_mainnet_staging` database and `multx_staging_readonly` role with no
  non-`SELECT` grants or Makalu/testnet transaction/cursor rows.
- The package reports network mode `none`, no published ports, a read-only root filesystem, all Linux capabilities
  dropped, and only an inert shell/`sleep` process. No application process executed.
- The package explicitly reports that no production MultX bridge contracts exist on chains 9005, 1, 56, or 8453.

## Exact Autha disposition

Autha's disposition is:

> **ISOLATION EVIDENCE ACCEPTED AS SCOPED — STAGED CANDIDATE IDENTITY NOT ESTABLISHED**

Autha accepts the database and container isolation evidence for the limited posture demonstrated. This is not an
acceptance of the staged application candidate and does not close Autha O-01.

## Open findings and observations

- **P-01 (Medium, open):** the staged archive digest
  `394908e861354c08a175ad4f431e8a1a05a10f1460c93e8f23848132a36808b9` matches none of the candidate archives
  Autha reviewed. The package contains no commit, tag, or per-file manifest that binds it to accepted source.
- **P-02 (Low, open):** candidate image ID
  `sha256:4fdda2a9c583f12990586158a64ef4ee7efbc1e390fb4f985b6396344616becf` and Compose image label
  `sha256:b56789e4d380d568652da39713b72c56c781e087a204455f6e1bd74f168f6bb8` are not reconciled.
- **P-03 (Low, open):** Docker labels record intent but do not enforce disablement. The demonstrated isolation came
  from network/port isolation and the inert entrypoint.
- **O-14:** no application behavior was exercised because the application entrypoint did not run.
- **O-15:** the report asks for explicit confirmation that AWS Secrets Manager is resolved out of band and is not a
  production runtime dependency, preserving the accepted non-AWS signer boundary.
- **O-16:** staging schema presence does not constitute review or acceptance of native swap, DEX-routing, payout, or
  faucet functionality.

## Remaining closure sequence

1. Build an immutable disabled-staging candidate from an exact approved commit/tag and record a per-file manifest.
2. Record one canonical image digest and reconcile the local image ID, registry digest, and Compose-resolved digest.
3. Use enforceable disabled configuration while running the real application entrypoint; retain network, port,
   filesystem, capability, and database isolation.
4. Repeat the transaction-free rehearsal and bind the evidence to exact source, image, configuration, host, window,
   operator, reviewer, and rollback identities.
5. Obtain Autha's written disposition for P-01/P-02/P-03 and the repeated application-level disabled rehearsal.
6. Keep O-01, production deployment, contracts, liquidity, signing, canary, and activation open until their separate
   governance and operational evidence is accepted.

## Provenance boundary

The supplied DOCX contains no OOXML digital-signature part and its core creator field is empty. The report content,
package identity, and evidence-digest bindings above are verified, but this public receipt alone does not
cryptographically authenticate the issuer. Preserve the original files in the controlled evidence store and use an
authenticated Autha/client channel if organizational authorship must be proven.

Nothing in this receipt authorizes deployment, funding, unpausing, release signing, liquidity, canary, or activation.
