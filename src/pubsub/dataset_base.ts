import { 
    DataType,
    resolveNodeId,
    AttributeIds,
    UAString,
    NodeIdLike
} from "node-opcua";
import { 
    DataSetFieldContentMask,
    JsonDataSetMessageContentMask,
    JsonNetworkMessageContentMask,
    BrokerTransportQualityOfService,
    MyMqttJsonPubSubConnectionDataType,
    Transport,
    PublishedDataItemsDataType,
    MyMqttJsonPubSubConnectionDataTypeOptions,
    MyMqttJsonWriterGroupDataTypeOptions,
    MyJsonDataSetWriterDataTypeOptions,
    PubSubConfigurationDataTypeOptions
} from "node-opcua-pubsub-expander";
import { 
    PubSubConfigurationDataType,
    PubSubConnectionDataTypeOptions,
    PublishedDataSetDataTypeOptions,
    FieldMetaDataOptions
} from "node-opcua-types";





export function createFieldEntry(_name: UAString, _builtInType: number): FieldMetaDataOptions 
{
    var _dataType: NodeIdLike;

    switch (_builtInType)
    {
        case 0:
            _dataType = resolveNodeId("Null");
            break;
        case 1:
            _dataType = resolveNodeId("Boolean");
            break;
        case 2:
            _dataType = resolveNodeId("SByte");
            break;
        case 3:
            _dataType = resolveNodeId("Byte");
            break;
        case 4:
            _dataType = resolveNodeId("Int16");
            break;
        case 5:
            _dataType = resolveNodeId("UInt16");
         break;
        case 6:
            _dataType = resolveNodeId("Int32");
            break;
        case 7:
            _dataType = resolveNodeId("UInt32");
            break;
        case 8:
            _dataType = resolveNodeId("Int64");
            break;
        case 9:
            _dataType = resolveNodeId("UInt64");
            break;
        case 10:
            _dataType = resolveNodeId("Float");
            break;
        case 11:
            _dataType = resolveNodeId("Double");
            break;
        case 12:
            _dataType = resolveNodeId("String");
            break;
        case 13:
            _dataType = resolveNodeId("DateTime");
            break;
        case 14:
            _dataType = resolveNodeId("Guid");
            break;
        case 15:
            _dataType = resolveNodeId("ByteString");
            break;
        case 16:
            _dataType = resolveNodeId("XmlElement");
            break;
        case 17:
            _dataType = resolveNodeId("NodeId");
            break;
        case 18:
            _dataType = resolveNodeId("ExpandedNodeId");
            break;
        case 19:
            _dataType = resolveNodeId("StatusCode");
            break;
        case 20:
            _dataType = resolveNodeId("QualifiedName");
            break;
        case 21:
            _dataType = resolveNodeId("LocalizedText");
            break;
        case 22:
            _dataType = resolveNodeId("ExtensionObject");
            break;
        case 23:
            _dataType = resolveNodeId("DataValue");
            break;
        case 24:
            _dataType = resolveNodeId("Variant");
            break;
        case 25:
            _dataType = resolveNodeId("DiagnosticInfo");
            break;
        default:
            _dataType = resolveNodeId("DiagnosticInfo");
            break;
    }

    const retVal: FieldMetaDataOptions = {
        name: _name,
        builtInType: _builtInType,
        dataType: _dataType
    }

    return retVal;
}



export function createPublishedData (_attributeId: AttributeIds, _samplingIntervalHint: number, _publishedVariable:string): object 
{

    const retVal: object = 
    {
        attributeId: _attributeId,
        samplingIntervalHint: _samplingIntervalHint,
        publishedVariable: _publishedVariable
    }

    return retVal;
}
