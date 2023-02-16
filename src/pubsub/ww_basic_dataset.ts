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

import { createFieldEntry, createPublishedData } from "./dataset_base";


export function createWwBasicIdentificationDataSet(): PublishedDataSetDataTypeOptions {

    var nodeId = 'ns=34'

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
        createFieldEntry("DeviceClass", DataType.String),
        createFieldEntry("Manufactor", DataType.LocalizedText),
        createFieldEntry("Model", DataType.LocalizedText),
        createFieldEntry("ProductInstanceUri", DataType.String),
        createFieldEntry("SerialNumber", DataType.String),
        createFieldEntry("YearOfConstruction", DataType.UInt16),
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
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6001`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6002`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6003`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6004`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6005`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6006`),
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


export function createWwBasicFlagsDataSet(): PublishedDataSetDataTypeOptions {

    var nodeId = 'ns=34'

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
        createFieldEntry("AirPresent", DataType.String),
        createFieldEntry("Alarm", DataType.Boolean),
        createFieldEntry("Calibrated", DataType.Boolean),
        createFieldEntry("DustChipSuction", DataType.Boolean),
        createFieldEntry("Emergency", DataType.Boolean),
        createFieldEntry("EnergySafing", DataType.Boolean),
        createFieldEntry("Error", DataType.Boolean),
        createFieldEntry("ExternalEmergency", DataType.Boolean),
        createFieldEntry("FeedRuns", DataType.Boolean),
        createFieldEntry("Hold", DataType.Boolean),
        createFieldEntry("LoadingEnabled", DataType.Boolean),
        createFieldEntry("MachineInit", DataType.Boolean),
        createFieldEntry("MachineOn", DataType.Boolean),
        createFieldEntry("MaintananceReqired", DataType.Boolean),
        createFieldEntry("ManualActivityReqired", DataType.Boolean),
        createFieldEntry("Moving", DataType.Boolean),
        createFieldEntry("PowerPresent", DataType.Boolean),
        createFieldEntry("RecipeInHold", DataType.Boolean),
        createFieldEntry("RecipeInRun", DataType.Boolean),
        createFieldEntry("RecipeInSetup", DataType.Boolean),
        createFieldEntry("Remote", DataType.Boolean),
        createFieldEntry("Safety", DataType.Boolean),
        createFieldEntry("WaitLoad", DataType.Boolean),
        createFieldEntry("WaitUnLoad", DataType.Boolean),
        createFieldEntry("Warning", DataType.Boolean),
        createFieldEntry("WorkPiecePresent", DataType.Boolean),
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
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6048`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6039`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6040`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6049`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6041`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6040`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6042`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6051`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=0052`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=0053`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=0054`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6043`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6044`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6055`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6056`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6057`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6045`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6058`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6046`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6059`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6060`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6061`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6062`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6063`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6047`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6064`),
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