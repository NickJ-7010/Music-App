import {
  tsValueToJsonValueFns,
  jsonValueToTsValueFns,
} from "../../../../runtime/json/scalar";
import {
  WireMessage,
} from "../../../../runtime/wire/index";
import {
  default as serialize,
} from "../../../../runtime/wire/serialize";
import {
  tsValueToWireValueFns,
  wireValueToTsValueFns,
} from "../../../../runtime/wire/scalar";
import {
  default as deserialize,
} from "../../../../runtime/wire/deserialize";

export declare namespace $.youtube.GetCommentsSectionParams.Params {
  export type Options = {
    videoId: string;
    sortBy: number;
    type: number;
  }
}

export type Type = $.youtube.GetCommentsSectionParams.Params.Options;

export function getDefaultValue(): $.youtube.GetCommentsSectionParams.Params.Options {
  return {
    videoId: "",
    sortBy: 0,
    type: 0,
  };
}

export function createValue(partialValue: Partial<$.youtube.GetCommentsSectionParams.Params.Options>): $.youtube.GetCommentsSectionParams.Params.Options {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.youtube.GetCommentsSectionParams.Params.Options): unknown {
  const result: any = {};
  if (value.videoId !== undefined) result.videoId = tsValueToJsonValueFns.string(value.videoId);
  if (value.sortBy !== undefined) result.sortBy = tsValueToJsonValueFns.int32(value.sortBy);
  if (value.type !== undefined) result.type = tsValueToJsonValueFns.int32(value.type);
  return result;
}

export function decodeJson(value: any): $.youtube.GetCommentsSectionParams.Params.Options {
  const result = getDefaultValue();
  if (value.videoId !== undefined) result.videoId = jsonValueToTsValueFns.string(value.videoId);
  if (value.sortBy !== undefined) result.sortBy = jsonValueToTsValueFns.int32(value.sortBy);
  if (value.type !== undefined) result.type = jsonValueToTsValueFns.int32(value.type);
  return result;
}

export function encodeBinary(value: $.youtube.GetCommentsSectionParams.Params.Options): Uint8Array {
  const result: WireMessage = [];
  if (value.videoId !== undefined) {
    const tsValue = value.videoId;
    result.push(
      [4, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.sortBy !== undefined) {
    const tsValue = value.sortBy;
    result.push(
      [6, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  if (value.type !== undefined) {
    const tsValue = value.type;
    result.push(
      [15, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.youtube.GetCommentsSectionParams.Params.Options {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(4);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.videoId = value;
  }
  field: {
    const wireValue = wireFields.get(6);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.sortBy = value;
  }
  field: {
    const wireValue = wireFields.get(15);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.type = value;
  }
  return result;
}
