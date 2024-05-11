# Parser

The parser is responsible for sanitizing and standardizing InnerTube responses while preserving the integrity of the data. 

## Table of Contents

- [Parser](#parser)
  - [Table of Contents](#table-of-contents)
  - [Structure](#structure)
    - [Core](#core)
    - [Clients](#clients)
  - [API](#api)
    - [`parse(data?: RawData, requireArray?: boolean, validTypes?: YTNodeConstructor<T> | YTNodeConstructor<T>[])`](#parsedata-rawdata-requirearray-boolean-validtypes-ytnodeconstructort--ytnodeconstructort)
    - [`parseResponse(data: IRawResponse): T`](#parseresponsedata-irawresponse-t)
  - [Usage](#usage)
    - [ObservedArray](#observedarray)
    - [SuperParsedResponse](#superparsedresponse)
    - [YTNode](#ytnode)
    - [Type Casting](#type-casting)
    - [Accessing properties without casting](#accessing-properties-without-casting)
    - [Memo](#memo)
  - [Adding new nodes](#adding-new-nodes)
  - [Generating nodes at runtime](#generating-nodes-at-runtime)
  - [How it works](#how-it-works)

## Structure
### Core

* [`/types`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/types) - General response types.
* [`/classes`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/classes) - InnerTube nodes.
* [`generator.ts`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/generator.ts) - Used to generate missing nodes at runtime.
* [`helpers.ts`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/helpers.ts) - Helper functions/classes for the parser.
* [`parser.ts`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/parser.ts) - The core of the parser.
* [`nodes.ts`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/nodes.ts) - Contains a list of all the InnerTube nodes, which is used to determine the appropriate node for a given renderer. It's important to note that this file is automatically generated and should not be edited manually.
* [`misc.ts`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/misc.ts) - Miscellaneous classes. Also automatically generated.

### Clients

The parser itself is not tied to any specific client. Therefore, we have a separate folder for each client that the library supports. These folders are responsible for arranging the parsed data into a format that can be easily consumed and understood. Additionally, the underlying data is also exposed for those who wish to access it.

* [`/youtube`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/youtube) 
* [`/ytmusic`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/ytmusic)
* [`/ytkids`](https://github.com/LuanRT/YouTube.js/blob/main/src/parser/ytkids)

## API

* Parser
  * [.parse](#parse)
  * [.parseItem](#parse)
  * [.parseArray](#parse)
  * [.parseResponse](#parseresponse) 

<a name="parse"></a>

### `parse(data?: RawData, requireArray?: boolean, validTypes?: YTNodeConstructor<T> | YTNodeConstructor<T>[])`

Responsible for parsing individual nodes.

| Param | Type | Description |
| --- | --- | --- |
| data | `RawData` | The data to parse |
| requireArray | `?boolean` | Whether the response should be an array |
| validTypes | `YTNodeConstructor<T> \| YTNodeConstructor<T>[] \| undefined` | Types of `YTNode` allowed |

- If `requireArray` is `true`, the response will be an `ObservedArray<YTNodes>`.
- If `validTypes` is `undefined`, the response will be an array of YTNodes.
- If `validTypes` is an array, the response will be an array of YTNodes that are of the types specified in the array.
- If `validTypes` is a single type, the response will be an array of YTNodes that are of the type specified.

If you do not specify `requireArray`, the return type of the function will not be known at runtime. Therefore, to gain access to the response, we return it wrapped in a helper, `SuperParsedResponse`.

You may use the `Parser#parseArray` and `Parser#parseItem` methods to parse the response in a deterministic way.

<a name="parseresponse"></a>

### `parseResponse(data: IRawResponse): T`

Unlike `parse`, this can be used to parse the entire response object.

| Param | Type | Description |
| --- | --- | --- |
| data | `IRawResponse` | Raw InnerTube response |

## Usage

### ObservedArray
You can utilize an `ObservedArray<T extends YTNode>` as a regular array, but it also offers further methods for accessing and casting values in a type-safe manner.

```ts
// For example, we have a feed, and want all the videos:
const feed = new ObservedArray<YTNode>([...feed.contents]);

// Here, we use the filterType method to retrieve only GridVideo items from the feed.
const videos = feed.filterType(GridVideo);
// `videos` is now a GridVideo[] array.

// Alternatively, we can use firstOfType to retrieve the first GridVideo item from the feed.
const firstVideo = feed.firstOfType(GridVideo);

// If we want to make sure that all elements in the `feed` array are of the `GridVideo` type, we can use the `as` method to cast the entire array to a `GridVideo[]` type. If the cast fails because of non-GridVideo items, an exception is thrown.
const allVideos = feed.as(GridVideo);

// Note that ObservedArray provides additional methods beyond what's shown here, which we use internally. For more information, see the source code or documentation.
```

### SuperParsedResponse
Represents a parsed response in an unknown state. Either a `YTNode`, an `ObservedArray<YTNode>`, or `null`. To extract the actual value, you must first assert the type and unwrap the response. 

```ts
// First, parse the data and store it in `response`.
const response = Parser.parse(data);

// Check whether `response` is a YTNode.
if (response.is_item) {
  // If so, we can assert that it is a YTNode and retrieve it.
  const node = response.item();
}

// Check whether `response` is an ObservedArray<YTNode>.
if (response.is_array) {
  // If so, we can assert that it is an ObservedArray<YTNode> and retrieve its contents as an array of YTNode objects.
  const nodes = response.array();
}

// Finally, to check if `response` is a null value, use the `is_null` getter.
const is_null = response.is_null;
```

### YTNode
All renderers returned by InnerTube are converted to this generic class and then extended for the specific renderers. This class is what allows us a type-safe way to use data returned by the InnerTube API.

Here's how to use this class to access returned data:

### Type Casting
```ts
// We can cast a YTNode to a child class of YTNode
const results = node.as(TwoColumnSearchResults);
// This will throw an error if the node is not a TwoColumnSearchResults.
// Therefore, we may want to check for the type of the node before casting.
if (node.is(TwoColumnSearchResults)) {
  // We do not need to recast the node; it is already a TwoColumnSearchResults after calling is() and using it in the branch where is() returns true.
  const results = node;
}

// Sometimes we can expect multiple types of nodes, we can just pass all possible types as params.
const results = node.as(TwoColumnSearchResults, VideoList);
// The type of `results` will now be `TwoColumnSearchResults | VideoList`

// Similarly, we can check if the node is of a certain type.
if (node.is(TwoColumnSearchResults, VideoList)) {
  // // Again, no casting is needed; the node is already of the correct type.
  const results = node;
}
```

### Accessing properties without casting
Sometimes multiple nodes have the same properties, and we don't want to check the type of the node before accessing the property. For example, the property 'contents' is used by many node types, and we may add more in the future. As such, we want to only assert the property instead of casting to a specific type.

```ts
// Accessing a property on a node when you aren't sure if it exists.
const prop = node.key("contents");

// This returns the value wrapped into a `Maybe` type, which you can use to determine the type of the value.
// However, this throws an error if the key doesn't exist, so we may want to check for the key before accessing it.
if (node.hasKey("contents")) {
  const prop = node.key("contents");
}

// We can assert the type of the value.
const prop = node.key("contents");
if (prop.isString()) {
  const value = prop.string();
}

// We can do more complex assertions, like checking for instanceof.
const prop = node.key("contents");
if (prop.isInstanceOf(Text)) {
  const text = prop.instanceOf(Text);
  
  // Then use the value as the given type.
  text.runs.forEach(run => {
    console.log(run.text);
  });
}

// There are special methods for use with the parser, such as getting the value as a YTNode.
const prop = node.key("contents");
if (prop.isNode()) {
  const node = prop.node();
}

// Like with YTNode, keys can also be checked for YTNode child class types.
const prop = node.key("contents");
if (prop.isNodeOfType(TwoColumnSearchResults)) {
  const results = prop.nodeOfType(TwoColumnSearchResults);
}

// Or we can check for multiple types of nodes.
const prop = node.key("contents");
if (prop.isNodeOfType([TwoColumnSearchResults, VideoList])) {
  const results = prop.nodeOfType<TwoColumnSearchResults | VideoList>([TwoColumnSearchResults, VideoList]);
}

// Sometimes an ObservedArray is returned when working with parsed data.
// We also have a helper for this.
const prop = node.key("contents");
if (prop.isObserved()) {
  const array = prop.observed();

  // Now we can use all the ObservedArray methods as normal, such as finding nodes of a certain type.
  const results = array.filterType(GridVideo);
}

// Other times a SuperParsedResult is returned, like when using the `Parser#parse` method.
const prop = node.key("contents");
if (prop.isParsed()) {
  const result = prop.parsed();

  // SuperParsedResult is another helper for type-safe access to the parsed data.
  // It is explained above with the `Parser#parse` method.
  const results = results.array();
  const videos = results.filterType(Video);
}

// Sometimes we just want to debug something and are not interested in finding the type.
// This will, however, warn you when being used.
const prop = node.key("contents");
const value = prop.any();

// Arrays are a special case, as every element may be of a different type.
// The `arrayOfMaybe` method will return an array of `Maybe`s.
const prop = node.key("contents");
if (prop.isArray()) {
  const array = prop.arrayOfMaybe(); 
  // This will return `Maybe[]`.
}

// Or, if you don't need type safety, you can use the `array` method.
const prop = node.key("contents");
if (prop.isArray()) {
  const array = prop.array();
  // This will return any[].
}
```

### Memo
The `Memo` class is a helper class for memoizing values in the `Parser#parseResponse` method. It can be used to conveniently access nodes after parsing the response.

For example, if we'd like to obtain all of the videos from a search result, we can use the `Memo#getType` method to find them quickly without needing to traverse the entire response.

```ts
const response = Parser.parseResponse(data);
const videos = response.contents_memo.getType(Video);
// This returns the nodes as an `ObservedArray<Video>`.
```

`Memo` extends `Map<string, YTNode[]>` and can be used as a regular `Map` if desired.

## Adding new nodes
Instructions can be found [here](https://github.com/LuanRT/YouTube.js/blob/main/docs/updating-the-parser.md).

## Generating nodes at runtime
YouTube constantly updates their client, and sometimes they add new nodes to the response. The parser needs to know about these new nodes in order to parse them correctly. Once a new node is dicovered by the parser, it will attempt to generate a new node class for it.

Using the existing `YTNode` class, you may interact with these new nodes in a type-safe way. However, you will not be able to cast them to the node's specific type, as this requires the node to be defined at compile-time.

The current implementation recognises the following values:
- Renderers
- Renderer arrays
- Text
- Navigation endpoints
- Author (does not currently detect the author thumbnails)
- Thumbnails
- Objects (key-value pairs)
- Primatives (string, number, boolean, etc.)

This may be expanded in the future.

At runtime, these JIT-generated nodes will revalidate themselves when constructed so that when the types change, the node will be re-generated.

To access these nodes that have been generated at runtime, you may use the `Parser.getParserByName(name: string)` method. You may also check if a parser has been generated for a node by using the `Parser.hasParser(name: string)` method.

```ts
import { Parser } from "youtubei.js";

// We may check if we have a parser for a node.
if (Parser.hasParser('Example')) {
  // Then retrieve it.
  const Example = Parser.getParserByName('Example');
  // We may then use the parser as normal.
  const example = new Example(data);
}
```

You may also generate your own nodes ahead of time, given you have an example of one of the nodes.

```ts
import { Generator } from "youtubei.js";

// Provided you have an example of the node `Example`
const example_data = {
  "title": {
    "runs": [
      {
        "text": "Example"
      }
    ]
  }
}

// The first argument is the name of the class, the second is the data you have for the node.
// It will return a class that extends YTNode.
const Example = Generator.generateRuntimeClass('Example', example_data);

// You may now use this class as you would any other node.
const example = new Example(example_data);

const title = example.key('title').instanceof(Text).toString();
```

## How it works

If you decompile a YouTube client and analyze it, it becomes apparent that it uses classes such as `../youtube/api/innertube/MusicItemRenderer` and `../youtube/api/innertube/SectionListRenderer` to parse objects from the response, map them into models, and generate the UI. The website operates similarly, but instead uses plain JSON. You can think of renderers as components in a web framework.

Our approach is similar to YouTube's: our parser goes through all the renderers and parses their inner element(s). The final result is a nicely structured JSON, it even parses navigation endpoints, which allow us to make an API call with all required parameters in one line and emulate client actions, such as clicking a button.

To illustrate the transformation we make, let's take an unstructured InnerTube response and parse it into a cleaner format:

Raw InnerTube Response:
```js
{
  sidebar: {
    playlistSidebarRenderer: {
      items: [
        {
          playlistSidebarPrimaryInfoRenderer: {
            title: {
              simpleText: '..'
            },
            description: {
              runs: [
                {
                  text: '..'
                },
                //....
              ]
            },
            stats: [
              {
                simpleText: '..'
              },
              {
                runs: [
                  {
                    text: '..'
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
}
```

Clean Parsed Response:
```js
{
  sidebar: {
    type: 'PlaylistSidebar',
    contents: [
      {
        type: 'PlaylistSidebarPrimaryInfo',
        title: { text: '..', runs: [ { text: '..' } ] },
        description: { text: '..', runs: [ { text: '..' } ] },
        stats: [
          {
            text: '..',
            runs: [
              {
                text: '..'
              }
            ]
          },
          {
            text: '..',
            runs: [
              {
                text: '..'
              }
            ]
          }
        ]
      }
    ]
  }
}
```