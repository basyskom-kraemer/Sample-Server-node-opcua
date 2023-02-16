import { 
    DataType,
    resolveNodeId,
    AttributeIds
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


const prefix = "basyskom"
//const dataPrefix = `${prefix}/json/machines`
//const metaPrefix = `${prefix}/json/machines/metadata`
const dataPrefix = `${prefix}/json/machines`
const metadataPrefix = `${prefix}/json/machines`


// const dataPrefix = `${prefix}/json/data/urn:SampleServer-node-opcua`
// const metaPrefix = `${prefix}/json/metadata/urn:SampleServer-node-opcua`


const createWriterGroup = (name: string, dataSetWriter: MyJsonDataSetWriterDataTypeOptions): MyMqttJsonWriterGroupDataTypeOptions => {
    const writerGroup: MyMqttJsonWriterGroupDataTypeOptions = {
        dataSetWriters: [dataSetWriter],
        enabled: true,
        publishingInterval: 1000,
        name: name,
        messageSettings: {
            networkMessageContentMask: JsonNetworkMessageContentMask.PublisherId,
        },
        transportSettings: {
            requestedDeliveryGuarantee: BrokerTransportQualityOfService.AtMostOnce
        },
    }
    return writerGroup
}


const createConnection = (name: string, dataSetName: string, writerGroupName: string, subGroupName: string, broker: string, id: number): PubSubConnectionDataTypeOptions => {
    const dataSetWriter: MyJsonDataSetWriterDataTypeOptions = {
        dataSetFieldContentMask: DataSetFieldContentMask.None,
            // DataSetFieldContentMask.SourceTimestamp |
            // DataSetFieldContentMask.StatusCode,
        dataSetName: dataSetName,
        dataSetWriterId: id,
        enabled: true,
        name: name,
        messageSettings: {
            // dataSetMessageContentMask?: JsonDataSetMessageContentMask;
            dataSetMessageContentMask: JsonDataSetMessageContentMask.None
                // JsonDataSetMessageContentMask.DataSetWriterId | 
                // JsonDataSetMessageContentMask.MetaDataVersion |
                // JsonDataSetMessageContentMask.DataSetWriterName |
                // JsonDataSetMessageContentMask.MessageType |
                // JsonDataSetMessageContentMask.SequenceNumber |
                // JsonDataSetMessageContentMask.Status |
                // JsonDataSetMessageContentMask.Timestamp
        },
        transportSettings: {
            // queueName?: UAString;
            // resourceUri?: UAString;
            // authenticationProfileUri?: UAString;
            // requestedDeliveryGuarantee?: BrokerTransportQualityOfService;
            // metaDataQueueName?: UAString;
            // metaDataUpdateTime?: Double;
            queueName: `${dataPrefix}/${writerGroupName}/${subGroupName}`,
            metaDataQueueName: `${metadataPrefix}/${writerGroupName}/${subGroupName}`,
            // queueName: `${dataPrefix}/${writerGroupName}/VariableDataSetWriter`,
            // metaDataQueueName: `${metaPrefix}/${writerGroupName}/VariableDataSetWriter`,
            metaDataUpdateTime: 5000
        },
    };

    const writerGroup: MyMqttJsonWriterGroupDataTypeOptions = createWriterGroup(writerGroupName, dataSetWriter)

    const opts: MyMqttJsonPubSubConnectionDataTypeOptions = {
        enabled: true,
        name: `Connection_${id}_${broker}`,
        transportProfileUri: Transport.MQTT_JSON,
        transportSettings: {
            // resourceUri?: UAString;
            // authenticationProfileUri?: UAString;
        },
        address: {
            url: broker,
        },
        writerGroups: [writerGroup],
        readerGroups: []
    }
    return new MyMqttJsonPubSubConnectionDataType(opts)
}


const createBasicWwIdentificationDataSet = (): PublishedDataSetDataTypeOptions => {

    const fields: FieldMetaDataOptions[] = [
        // {
        //     name?: UAString;
        //     description?: (LocalizedTextLike | null);
        //     fieldFlags?: DataSetFieldFlags;
        //     builtInType?: Byte;
        //     dataType?: (NodeIdLike | null);
        //     valueRank?: Int32;
        //     arrayDimensions?: UInt32[] | null;
        //     maxStringLength?: UInt32;
        //     dataSetFieldId?: Guid;
        //     properties?: KeyValuePairOptions[] | null;
        // }

        // Define basic woodworking IDENTIFICATION nodes
        {
            name: "DeviceClass",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "Manufactor",
            builtInType: DataType.LocalizedText,
            dataType: resolveNodeId("LocalizedText"),
        },
        {
            name: "Model",
            builtInType: DataType.LocalizedText,
            dataType: resolveNodeId("LocalizedText"),
        },
        {
            name: "ProductInstanceUri",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SerialNumber",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "YearOfConstruction",
            builtInType: DataType.UInt16,
            dataType: resolveNodeId("UInt16"),
        }

    ]

    const publishedData = [
        // {
        //     publishedVariable?: (NodeIdLike | null);
        //     attributeId?: UInt32;
        //     samplingIntervalHint?: Double;
        //     deadbandType?: UInt32;
        //     deadbandValue?: Double;
        //     indexRange?: NumericRange;
        //     substituteValue?: (VariantLike | null);
        //     metaDataProperties?: (QualifiedNameLike | null)[] | null;
        // }

        // Set basic woodworking IDENTIFICATION nodes
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6001`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6002`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6003`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6004`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6005`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6006`,
        }
    ]

    const publishedDataSet: PublishedDataSetDataTypeOptions = {
        name: "BasicWoodWorkingIdentification",
        dataSetMetaData: {
            fields: fields,
        },
        dataSetSource: new PublishedDataItemsDataType({
            publishedData: publishedData,
        }),
    };
    return publishedDataSet;
}

const createBasicWwFlagsDataSet = (): PublishedDataSetDataTypeOptions => {

    const fields: FieldMetaDataOptions[] = [
        // {
        //     name?: UAString;
        //     description?: (LocalizedTextLike | null);
        //     fieldFlags?: DataSetFieldFlags;
        //     builtInType?: Byte;
        //     dataType?: (NodeIdLike | null);
        //     valueRank?: Int32;
        //     arrayDimensions?: UInt32[] | null;
        //     maxStringLength?: UInt32;
        //     dataSetFieldId?: Guid;
        //     properties?: KeyValuePairOptions[] | null;
        // }

        // Define basic woodworking FLAGS nodes
        {
            name: "AirPresent",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "Alarm",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Calibrated",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "DustChipSuction",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Emergency",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "EnergySafing",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Error",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "ExternalEmergency",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "FeedRuns",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Hold",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },

        {
            name: "LoadingEnabled",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "MachineInit",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "MachineOn",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "MaintananceReqired",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "ManualActivityReqired",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Moving",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "PowerPresent",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "RecipeInHold",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "RecipeInRun",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "RecipeInSetup",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Remote",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Safety",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "WaitLoad",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "WaitUnLoad",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "Warning",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        },
        {
            name: "WorkPiecePresent",
            builtInType: DataType.Boolean,
            dataType: resolveNodeId("Boolean"),
        }
    ]

    const publishedData = [
        // {
        //     publishedVariable?: (NodeIdLike | null);
        //     attributeId?: UInt32;
        //     samplingIntervalHint?: Double;
        //     deadbandType?: UInt32;
        //     deadbandValue?: Double;
        //     indexRange?: NumericRange;
        //     substituteValue?: (VariantLike | null);
        //     metaDataProperties?: (QualifiedNameLike | null)[] | null;
        // }

        // Set basic woodworking FLAGS nodes
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6048`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6039`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6040`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6049`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6041`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6040`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6042`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6051`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6052`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6053`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6054`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6043`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6044`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6055`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6056`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6057`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6045`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6058`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6046`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6059`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6060`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6061`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6062`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6063`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6047`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6064`,
        },
    ]

    const publishedDataSet: PublishedDataSetDataTypeOptions = {
        name: "BasicWoodWorkingFlags",
        dataSetMetaData: {
            fields: fields,
        },
        dataSetSource: new PublishedDataItemsDataType({
            publishedData: publishedData,
        }),
    };
    return publishedDataSet;
}


const createFullWoodWorkingDataSet = (): PublishedDataSetDataTypeOptions => {

    const fields: FieldMetaDataOptions[] = [
        // {
        //     name?: UAString;
        //     description?: (LocalizedTextLike | null);
        //     fieldFlags?: DataSetFieldFlags;
        //     builtInType?: Byte;
        //     dataType?: (NodeIdLike | null);
        //     valueRank?: Int32;
        //     arrayDimensions?: UInt32[] | null;
        //     maxStringLength?: UInt32;
        //     dataSetFieldId?: Guid;
        //     properties?: KeyValuePairOptions[] | null;
        // }

        // Define full woodworking IDENTIFICATION nodes
        {
            name: "AssetIdNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "DeviceClassNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "HardwareRevNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationGpsNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationPlantNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ManufacturerUriNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ProductCodeNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ProductInstanceUriNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SerialNumberNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SoftwareRevisionNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "YearOfConstructionNode",
            builtInType: DataType.UInt16,
            dataType: resolveNodeId("UInt16"),
        }
    ]

    const publishedData = [
        // {
        //     publishedVariable?: (NodeIdLike | null);
        //     attributeId?: UInt32;
        //     samplingIntervalHint?: Double;
        //     deadbandType?: UInt32;
        //     deadbandValue?: Double;
        //     indexRange?: NumericRange;
        //     substituteValue?: (VariantLike | null);
        //     metaDataProperties?: (QualifiedNameLike | null)[] | null;
        // }

        // Set full woodworking IDENTIFICATION nodes
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6026`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6018`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6029`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6031`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6032`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6033`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6034`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6036`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6021`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6022`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6037`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6023`,
        }
    ]

    const publishedDataSet: PublishedDataSetDataTypeOptions = {
        name: "PublishedFullWoodWorking",
        dataSetMetaData: {
            fields: fields,
        },
        dataSetSource: new PublishedDataItemsDataType({
            publishedData: publishedData,
        }),
    };
    return publishedDataSet;
}


export const constructMqttJsonPubSubConfiguration = (broker: string) => {
    const opts: PubSubConfigurationDataTypeOptions = {
        connections: [
            createConnection("BasicWoodWorkingIdentification", "BasicWoodWorkingIdentification", "basic_woodworking", "identification", broker, 1),
            createConnection("BasicWoodWorkingFlags", "BasicWoodWorkingFlags", "basic_woodworking", "state/machine/flags", broker, 2),
            createConnection("PublishedFullWoodWorking", "PublishedFullWoodWorking", "full_woodworking", "identification", broker, 3)
        ],
        publishedDataSets: [
            createBasicWwIdentificationDataSet(),
            createBasicWwFlagsDataSet(),
            createFullWoodWorkingDataSet()
        ]
    }
    return new PubSubConfigurationDataType(opts);
}
