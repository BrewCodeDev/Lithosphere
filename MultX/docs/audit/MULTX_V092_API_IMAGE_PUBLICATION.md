# MultX v0.9.2 API image publication

The manual `Publish reviewed MultX v0.9.2 API image` workflow produces the
immutable API image required by the disabled-staging indexer plan. It publishes
an image; it does not deploy it, contact staging, configure a database, request
a signature, submit a transaction, or authorize MultX activation.

## Fixed source boundary

- Source repository: `KaJLabs/Lithosphere`
- Autha-accepted source commit:
  `5994f263b9d1fd40c531410d6b23884eade9f5b9`
- Accepted source SHA-256:
  `f40e76603d5dff8d8a283a8d426786c375e3e96bd20aea73de516547c50dfecc`
- Image name: `ghcr.io/kajlabs/lithosphere/multx-api`
- Immutable tag: `v0.9.2-5994f263b9d1fd40c531410d6b23884eade9f5b9`

The workflow rejects any other source commit and requires the exact confirmation
text `PUBLISH_REVIEWED_V092_API`.

## Required repository control

Before the first dispatch, repository administrators must configure the
`multx-image-publish` GitHub environment with:

- an independent security/operator reviewer such as `@lithoagent`;
- prevention of self-review; and
- no deployment secrets, signer keys, RPC credentials, or database credentials.

The validation job runs before the protected environment. The publication job
cannot begin until the environment reviewer approves it.

## Publication gates

1. Check out and verify the exact accepted commit.
2. Install the locked API dependencies.
3. Reject moderate-or-higher production dependency advisories.
4. Run the full API test suite and load-bearing mutation checks.
5. Build the exact API Docker context with accepted-source labels.
6. Reject fixable HIGH or CRITICAL image findings before registry login.
7. Publish only the immutable v0.9.2 tag; no `latest` or mutable mainnet tag is
   written.
8. Capture the registry digest, sign it with keyless Cosign, attach GitHub build
   provenance, generate a retained SPDX SBOM, and verify signature/provenance.

## Evidence and next gate

Record the workflow run URL and exact `ghcr.io/...@sha256:...` reference in the
private schema-v2 plan. An independent reviewer must accept the image digest,
base/dependency results, signature, provenance, and SBOM before the image input
is checked complete. Publishing the image does not authorize a disabled-staging
run or production activation.
