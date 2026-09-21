# Autha staging provenance closeout receipt

Date received and independently checked: 2026-09-21.

This receipt records the two Autha closeout reports that supersede the open provenance and evidence-quality findings
in `AUTHA_PRIVATE_INFRA_STAGING_RECEIPT_2026-09-19.md`. The source reports remain external controlled evidence and
are not reproduced in this public repository.

## Supplied report identities

### P-01 closeout, round two

- Report filename: `Autha Audits — MultX P-01 Closeout Review (Round 2).docx`
- Report SHA-256: `341ce87bcba972ead9ed9ef540f670f2e56fbd0b0f1fb900eedae289bee48136`
- Declared issue date: 2026-09-19
- Target package: `MULTX_P01_CLOSEOUT_MXDSV-20260919T125112Z-P01-R2.zip`
- Declared target-package SHA-256:
  `2e70fffe762009dcd50bcea9a1aef5ee29f1ca54acb5194b1fa402efac3c19af`
- Artifact reference: `MXDSV-20260919T125112Z-P01-R2`
- Reviewed tag: `multx-native-review-2026-09-19`
- Reviewed commit: `d77bd4214dbbbbcabe99df373a2d86ad572e7819`
- Disposition: **P-01 CLOSED — IMAGE-TO-SOURCE ATTESTATION RAISED AS P-05**

### P-05 and P-03 closeout

- Report filename: `Autha Audits — MultX P-05 and P-03 Closeout Review.docx`
- Report SHA-256: `d7d7b683463bd436710b8168a8144635ef661b0c47848583a8b075118db67d4a`
- Declared issue date: 2026-09-20
- Target package: `MULTX_P05_CLOSEOUT_MXDSV-20260920T151153Z-P05.zip`
- Declared target-package SHA-256:
  `6fd48fe79663f740897db95b3c2f15fc1efafbd938725dc06d7e9b5c98334efb`
- Artifact reference: `MXDSV-20260920T151153Z-P05`
- Reviewed tag: `multx-native-review-2026-09-19`
- Reviewed commit: `d77bd4214dbbbbcabe99df373a2d86ad572e7819`
- Disposition: **P-05 CLOSED — P-03 CLOSED — O-18 AND O-15 CLOSED**

## Local binding checks

- Both retained DOCX files hash to the exact report identities recorded above.
- Both documents were parsed directly. Their audit targets, package digests, tag, commit, finding tables, scope
  limitations, and overall dispositions match this receipt.
- The annotated repository tag `multx-native-review-2026-09-19` resolves to exact commit
  `d77bd4214dbbbbcabe99df373a2d86ad572e7819` in `KaJLabs/Lithosphere`.
- That reviewed commit is an ancestor of current public `main` and PR #188 is merged.
- The two target evidence ZIPs were not available in the supplied local paths on 2026-09-21. Their declared package
  hashes and internal verification results are therefore recorded from the Autha reports, not independently
  recomputed in this receipt.

## Closure recorded

The Round 2 report closes P-01 by binding staging source to the exact reviewed tag, commit, source archive, and
673-file source manifest. It also reconciles the previously conflicting image identifiers as an OCI index and its
selected platform manifest.

The later closeout report closes P-05 through an in-image, bidirectional 673-file comparison against the reviewed
manifest. It records 673 declared, 673 present, 673 verified, zero missing, zero mismatched, and zero unlisted files.
The report also closes P-03 by classifying labels as declared metadata rather than enforcement, and closes O-15 and
O-18 after removing the AWS ARN/account identifier and making the database capture self-evidencing.

Autha's final staging closeout records:

- zero Critical findings open;
- zero High findings open;
- zero Medium findings open;
- zero Low findings open; and
- no remaining Autha finding against staging provenance, isolation, or evidence quality.

## Remaining boundaries

- **Autha O-01 remains open:** signer custody and independent operators, governance assignments, asset/origin
  decisions, routes, caps, liquidity, finality, deployment/control-path verification, canary evidence, and explicit
  activation approval remain required.
- **O-14 is carried:** the staging exercise remains an isolation rehearsal, not an application-behavior rehearsal.
- **O-19 is advisory:** `/reviewed-source` was manifest-verified, while the executing `/app` directory was not. The
  executing directory must be attested directly before MultX is ever run enabled.
- The native settlement layer, Lithoswap V2 contracts, SDK, and web surface are outside these Autha closeouts and are
  not accepted by implication.
- MultX, Bridge signing, Swap, release relaying, liquidity, canary, and activation remain disabled or unauthorized.

## Provenance boundary

Neither supplied DOCX contains an OOXML digital-signature part and both have an empty core creator field. Their
content and local file hashes are verified, but this receipt alone does not cryptographically authenticate the
issuer. Preserve the original reports and evidence packages in the controlled evidence store and use an
authenticated Autha/client channel when organizational authorship is material.

Nothing in this receipt authorizes deployment, funding, unpausing, release signing, liquidity, canary, or activation.
