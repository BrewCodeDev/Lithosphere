# Quantt integration acceptance record

- **Workstream:** MX-05
- **Environment:** Makalu explorer and API
- **Status:** Approved hostname confirmed; API contract and credentials still required
- **Last verified:** 2026-09-20

This is the activation and acceptance record for the Quantt explorer integration. Similar-looking domains, guessed
paths, inferred authentication, and inferred response fields are not acceptable evidence.

## Verified public state

| Surface | Result | Evidence |
| --- | --- | --- |
| Makalu status | PASS (disabled) | `https://makalu.litho.ai/api/quantt/status` returns HTTP 200 with `configured: false` and `apiOrigin: null`. |
| Research portal | PASS | `https://research.quantt.at/` returns HTTP 200 with title `Quantt Agents Research`. |
| Approved hostname boundary | CONFIRMED | The owner confirmed `quantts.ai` on 2026-09-20. API configuration accepts only that host and its subdomains. |
| Developer portal | PASS | `https://dev.quantts.ai/` returns HTTP 200 with valid hostname verification. |
| Apex site | PASS | `https://quantts.ai/` returns HTTP 200 with valid hostname verification. |
| API hostname | NOT YET APPROVED AS AN ENDPOINT | `https://api.quantts.ai/` completes TLS but returned HTTP 502 at its root; no API path or contract is inferred from that observation. |

The public state was repeated on 2026-09-20: `/quantt` returned HTTP 200, status remained `configured: false` with
`apiOrigin: null`, insights failed closed with HTTP 503, and the research portal returned HTTP 200. The owner then
confirmed `quantts.ai` as the correct hostname boundary. This resolves the spelling/TLS ambiguity but does not
identify the production API origin, request path, authentication scheme, or response contract.

## Repository integration boundary

The explorer contains a disabled research page and a server-only API proxy. Credentials are never sent to the
browser. Activation requires all of these explicit server settings:

| Setting | Required owner input |
| --- | --- |
| `QUANTT_API_BASE_URL` | Approved HTTPS API origin under the approved Quantt domain. |
| `QUANTT_API_KEY` | Credential delivered through the deployment secret manager, never chat or source control. |
| `QUANTT_API_AUTH_HEADER` | Exactly `authorization` or `x-api-key`, confirmed by Quantt. |
| `QUANTT_INSIGHTS_PATH` | Exact approved path beginning with one `/`. |
| `QUANTT_API_TIMEOUT_MS` | Optional; bounded by the adapter to 1–30 seconds. |

The adapter does not default the auth scheme or insights path. It rejects HTTP, userinfo, query/hash-bearing base
URLs, unrelated hostnames, protocol-relative paths, and malformed symbols. The upstream credential remains
server-side and sanitized errors do not return it to clients.

## Inputs still required from Quantt

- [x] Confirm the canonical hostname boundary: `quantts.ai` (owner confirmation, 2026-09-20).
- [x] Confirm a TLS-valid developer portal: `https://dev.quantts.ai/` (HTTP 200, 2026-09-20).
- [ ] Identify the exact production and development API base URLs beneath the approved hostname boundary.
- [ ] Provide the exact base URL, HTTP method, insights path, authentication scheme, and credential through the
      approved secret manager.
- [ ] Provide the versioned request/response schema, required headers, supported symbols, score units/range,
      timestamp semantics, rate limits, timeout/retry guidance, and cache policy.
- [ ] Provide non-secret success and error fixtures plus a test credential or sandbox access.
- [ ] Name the Quantt technical approver and incident/contact channel.

## Controlled activation sequence

1. Review the owner-supplied API contract and replace the provisional response normalizer with the exact versioned
   schema mapping and validation.
2. Add contract fixtures for success, authentication failure, rate limiting, timeout, malformed JSON, oversized
   response, and upstream 5xx behavior.
3. Repair/validate the developer TLS endpoint and record certificate hostname/expiry evidence.
4. Add the approved non-secret settings and secret-manager credential to the Makalu deployment environment.
5. Deploy an immutable release through the protected core workflow; do not modify the faucet.
6. Confirm `/api/quantt/status` reports configured without exposing the key, then run bounded live insight tests.
7. Test the explorer's loading, empty, error, stale/cache, and successful result states.
8. Record Quantt and Dev Infra acceptance below.

## Acceptance criteria

- [ ] Canonical hosts pass DNS, certificate-chain, hostname, and HTTPS checks.
- [ ] The implemented request and response mapping matches a versioned owner-approved contract.
- [ ] Credentials exist only in the secret manager/API process and are absent from responses, logs, and browser
      assets.
- [ ] Rate limits, timeouts, response-size bounds, retry behavior, caching, and error translation are tested.
- [ ] A live LITHO request returns the expected mapped result through the Makalu explorer.
- [ ] Disable/rollback behavior is tested and documented.
- [ ] Quantt and Dev Infra approvers, date, release, and evidence are recorded.

## Evidence and approval

| Field | Value |
| --- | --- |
| Repository PR | [#88](https://github.com/KaJLabs/Lithosphere/pull/88) |
| Merge commit | `c01ec48472544270ec0716483e5a07bba947b079` |
| Deployment run/release | [31828985116](https://github.com/KaJLabs/Lithosphere/actions/runs/31828985116) — PASS / `c01ec48472544270ec0716483e5a07bba947b079` |
| Quantt contract/version | Pending |
| Live test artifact | `/quantt` 200; status `configured: false`, `apiOrigin: null`; insights 503 after deployment (2026-08-14) |
| Quantt approver/date | Pending |
| Dev Infra approver/date | Pending |
