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
import { 
    CreateWwBasicIdentificationDataSet, 
    CreateWwBasicFlagsDataSet 
} from "./ww_basic_dataset"
import { 
    createWwFullIdentificationDataSet, 
    createWwFullFlagsDataSet 
} from "./ww_full_dataset"

const prefix = "basyskom"
const dataPrefix = `${prefix}/json/machines`
const metadataPrefix = `${prefix}/json/machines`


export const constructWoodWorkingPubSubConfiguration = (broker: string) => {
    const opts: PubSubConfigurationDataTypeOptions = {
        connections: [
            createConnection("BasicWoodWorkingIdentification", "BasicWoodWorkingIdentification", "basic_woodworking", "identification", broker, 1),
            createConnection("BasicWoodWorkingFlags", "BasicWoodWorkingFlags", "basic_woodworking", "state/machine/flags", broker, 2),
            createConnection("PublishedFullWoodWorking", "PublishedFullWoodWorking", "full_woodworking", "identification", broker, 3)
        ],
        publishedDataSets: [
            CreateWwBasicIdentificationDataSet(),
            CreateWwBasicFlagsDataSet(),
            createWwFullIdentificationDataSet(),
            createWwFullFlagsDataSet()
        ]
    }
    return new PubSubConfigurationDataType(opts);
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