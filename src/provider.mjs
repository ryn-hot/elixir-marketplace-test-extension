// Generated qualification code, not a production content provider.
// No imports, media, URLs, credentials, network, filesystem or persistent state.
const version = '1.0.0';
const cache = {maxAgeSeconds: 60, staleWhileRevalidateSeconds: 0, etag: version};

function reply(body, status = 200) {
  return {schema_version: 1, status, body};
}
function unavailable(code, message) {
  return reply({error: {code, message, retryable: false, retryAfterSeconds: null}}, 404);
}
function item() {
  return {
    id: 'synthetic-channel', itemType: 'channel',
    title: `Synthetic test channel ${version}`,
    description: 'This generated metadata has no media stream.', status: 'unknown',
    categories: [], badges: [], facts: [],
  };
}
export async function invoke(input) {
  if (input?.schema_version !== 1 || input?.capability !== 'live.catalog_provider') {
    return reply({error: {code: 'invalid_request', message: 'Unsupported fixture request.',
      retryable: false, retryAfterSeconds: null}}, 400);
  }
  const request = input.request?.request;
  switch (input.operation) {
    case 'health':
      return reply({status: 'healthy', contractVersions: [1], details: []});
    case 'catalogs':
      return reply({catalogs: [{id: 'synthetic', name: `Qualification ${version}`,
        description: 'Generated metadata only; no media.', itemTypes: ['channel'],
        presentation: 'landscape', order: 1, filters: []}], cache});
    case 'catalog':
      if (request?.catalogId !== 'synthetic') return unavailable('item_not_found', 'Unknown test catalog.');
      return reply({items: request.cursor ? [] : [item()], nextCursor: null, cache});
    case 'meta':
      if (request?.itemId !== 'synthetic-channel') return unavailable('item_not_found', 'Unknown test item.');
      return reply({item: item(), streams: [], cache});
    case 'resolve':
      return unavailable('stream_not_found', 'This test fixture contains no media.');
    default:
      return reply({error: {code: 'unsupported_input', message: 'Unsupported fixture operation.',
        retryable: false, retryAfterSeconds: null}}, 400);
  }
}
export async function checkReady() { return true; }
